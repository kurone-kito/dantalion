/**
 * Property-based tests for `getPersonality`. These complement the
 * regression baseline (`personality.json` walk) and the independent
 * reference (`reference.spec.ts`) by asserting the algebraic
 * invariants directly, so they survive any fixture rebuild and any
 * documentation-only refactor.
 */
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import getPersonality from './getPersonality.js';

const VALID_GENIUS = new Set([
  '000',
  '001',
  '012',
  '024',
  '025',
  '100',
  '108',
  '125',
  '555',
  '789',
  '888',
  '919',
]);
const VALID_LIFEBASE = new Set([
  'application',
  'association',
  'development',
  'expression',
  'finance',
  'investment',
  'organization',
  'quest',
  'selfMind',
  'selfReliance',
]);

const inRangeDate = fc
  .date({
    min: new Date(Date.UTC(1873, 1, 1)),
    max: new Date(Date.UTC(2050, 11, 31)),
    noInvalidDate: true,
  })
  .map((d) => d.toISOString().slice(0, 10));

const outOfRangeDate = fc.oneof(
  fc
    .date({
      min: new Date(Date.UTC(1700, 0, 1)),
      max: new Date(Date.UTC(1873, 0, 31)),
      noInvalidDate: true,
    })
    .map((d) => d.toISOString().slice(0, 10)),
  fc
    .date({
      min: new Date(Date.UTC(2051, 0, 1)),
      max: new Date(Date.UTC(2200, 11, 31)),
      noInvalidDate: true,
    })
    .map((d) => d.toISOString().slice(0, 10)),
);

const addDays = (iso: string, days: number): string => {
  const t = new Date(`${iso}T00:00:00Z`).getTime() + days * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
};

describe('getPersonality — algebraic invariants', () => {
  it('A: cycle ∈ [1, 10] for any in-range date', () => {
    fc.assert(
      fc.property(inRangeDate, (date) => {
        const p = getPersonality(date);
        if (!p) return true; // out-of-range slipped through
        return Number.isInteger(p.cycle) && p.cycle >= 1 && p.cycle <= 10;
      }),
    );
  });

  it('B: 10-day stem period — cycle repeats every 10 days', () => {
    // `cycle` corresponds to the day stem (1..10). The day stem advances
    // by one each calendar day modulo 10, so `cycle(d) === cycle(d+10)`
    // must hold whenever both dates are in range.
    //
    // (Note: `inner` does NOT repeat every 60 days even though the day
    // stem-branch pair does — the 十二運 mapping that produces `inner`
    // also reads the Bazi month, which advances across solar terms.
    // The narrower 10-day cycle test is the strongest invariant that
    // does not depend on month-pillar position.)
    const safeWindow = fc
      .date({
        min: new Date(Date.UTC(1900, 0, 1)),
        max: new Date(Date.UTC(2020, 11, 31)),
        noInvalidDate: true,
      })
      .map((d) => d.toISOString().slice(0, 10));
    fc.assert(
      fc.property(safeWindow, (date) => {
        const a = getPersonality(date);
        const b = getPersonality(addDays(date, 10));
        if (!a || !b) return true;
        return a.cycle === b.cycle;
      }),
    );
  });

  it('C: determinism — same input yields identical output', () => {
    fc.assert(
      fc.property(inRangeDate, (date) => {
        const a = JSON.stringify(getPersonality(date));
        const b = JSON.stringify(getPersonality(date));
        return a === b;
      }),
    );
  });

  it('D: inner / outer / workStyle ∈ valid Genius set', () => {
    fc.assert(
      fc.property(inRangeDate, (date) => {
        const p = getPersonality(date);
        if (!p) return true;
        return (
          VALID_GENIUS.has(p.inner) &&
          VALID_GENIUS.has(p.outer) &&
          VALID_GENIUS.has(p.workStyle)
        );
      }),
    );
  });

  it('E: lifeBase ∈ valid LifeBase set', () => {
    fc.assert(
      fc.property(inRangeDate, (date) => {
        const p = getPersonality(date);
        if (!p) return true;
        return VALID_LIFEBASE.has(p.lifeBase);
      }),
    );
  });

  it('F: out-of-range dates return undefined', () => {
    fc.assert(
      fc.property(outOfRangeDate, (date) => getPersonality(date) === undefined),
    );
  });

  it('manual sanity: a few hand-picked dates produce in-range cycle', () => {
    // Quick smoke that the property-based generators are actually
    // exercising the function (not silently returning early).
    for (const d of ['1900-06-15', '2000-01-07', '2024-12-31']) {
      const p = getPersonality(d);
      expect(p).toBeDefined();
      if (!p) continue;
      expect(p.cycle).toBeGreaterThanOrEqual(1);
      expect(p.cycle).toBeLessThanOrEqual(10);
    }
  });
});
