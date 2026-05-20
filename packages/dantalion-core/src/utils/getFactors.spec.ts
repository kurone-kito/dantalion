/**
 * Unit tests for getFactors.
 *
 * Note on the surviving Stryker mutant (issue #163):
 *   getFactors.ts:54  shiftAndModulo(shifted * 6 + hi * 4 + cycle - 6, 12)
 *                     ↳ mutant: cycle + 6
 *
 * This is a provably equivalent mutant given the current shiftAndModulo.ts
 * implementation: shiftAndModulo(a, n) = ((((a-1) % n) + n) % n) + 1, which
 * has period n. Therefore shiftAndModulo(v + 12, 12) === shiftAndModulo(v, 12)
 * for all v ∈ ℤ. The two expressions differ by exactly 12 (the modulus), making
 * them identical for all inputs. No test can distinguish them.
 */
import { describe, expect, it } from 'vitest';
import getMonthlyCoefficients from '../records/getMonthlyCoefficients.js';
import getBirthdayDetails from './getBirthdayDetails.js';
import getFactors from './getFactors.js';

const makeSource = (dateStr: string) => {
  // Avoid the new Date('YYYY-MM-DD') UTC-midnight pitfall: that form parses as
  // UTC midnight, shifting the local calendar day on non-UTC runners since
  // getBirthdayDetails uses local getters (getDate/getMonth/getFullYear).
  // Note: getMonthlyCoefficients also uses a fixed-epoch anchor with local
  // getters, so full timezone-independence is not claimed; the fix only ensures
  // dateStr's calendar day is not inadvertently offset by the TZ difference.
  const [y, m, d] = dateStr.split('-').map(Number) as [number, number, number];
  const date = new Date(y, m - 1, d);
  return {
    ...getBirthdayDetails(date),
    monthlyCoefficient: getMonthlyCoefficients(date),
  };
};

describe('getFactors', () => {
  describe('return shape', () => {
    it('returns an object with all expected keys', () => {
      const result = getFactors(makeSource('2000-01-07'));
      expect(result).toMatchObject({
        cycle: expect.any(Number),
        inner: expect.any(Number),
        lifeBase: expect.any(Number),
        outer: expect.any(Number),
        potentials: expect.any(Array),
        workStyle: expect.any(Number),
        getXY: expect.any(Function),
      });
    });

    it('potentials has exactly 2 elements', () => {
      const result = getFactors(makeSource('2000-01-07'));
      expect(result.potentials).toHaveLength(2);
    });

    it('getXY returns a Source2D object for a given value', () => {
      const result = getFactors(makeSource('2000-01-07'));
      const xy = result.getXY(1);
      expect(xy).toMatchObject({
        x: expect.any(Number),
        y: expect.any(Number),
      });
    });
  });

  describe('value ranges', () => {
    it.each([
      '2000-01-07',
      '2000-01-17',
      '2000-02-05',
      '1984-02-05',
      '2024-12-31',
    ])('cycle is in [1, 10] for %s', (dateStr) => {
      const { cycle } = getFactors(makeSource(dateStr));
      expect(cycle).toBeGreaterThanOrEqual(1);
      expect(cycle).toBeLessThanOrEqual(10);
    });

    it.each([
      '2000-01-07',
      '2000-01-17',
      '2000-02-05',
      '1984-02-05',
      '2024-12-31',
    ])('inner is in [1, 12] for %s', (dateStr) => {
      const { inner } = getFactors(makeSource(dateStr));
      expect(inner).toBeGreaterThanOrEqual(1);
      expect(inner).toBeLessThanOrEqual(12);
    });

    it.each([
      '2000-01-07',
      '2000-01-17',
      '2000-02-05',
      '1984-02-05',
      '2024-12-31',
    ])('outer is in [1, 12] for %s', (dateStr) => {
      const { outer } = getFactors(makeSource(dateStr));
      expect(outer).toBeGreaterThanOrEqual(1);
      expect(outer).toBeLessThanOrEqual(12);
    });
  });

  describe('known-value pin tests', () => {
    it.each<[string, number, number, number, number]>([
      ['2000-01-07', 1, 1, 2, 4],
      ['2000-01-08', 2, 2, 2, 4],
      ['2000-01-09', 3, 3, 2, 4],
      ['2000-01-10', 4, 4, 2, 4],
      ['2000-01-17', 1, 11, 2, 4],
      ['2000-02-05', 10, 6, 3, 5],
      ['1984-02-05', 6, 6, 3, 1],
      ['2024-12-31', 6, 6, 1, 5],
    ])('%s → cycle=%i, inner=%i, outer=%i, workStyle=%i', (dateStr, cycle, inner, outer, workStyle) => {
      const factors = getFactors(makeSource(dateStr));
      expect(factors.cycle).toBe(cycle);
      expect(factors.inner).toBe(inner);
      expect(factors.outer).toBe(outer);
      expect(factors.workStyle).toBe(workStyle);
    });

    it('potentials match expected values for 2000-01-07', () => {
      const { potentials } = getFactors(makeSource('2000-01-07'));
      expect(potentials).toStrictEqual([6, 4]);
    });

    it('lifeBase is date minus monthly coefficient for 2000-01-07', () => {
      const { lifeBase } = getFactors(makeSource('2000-01-07'));
      expect(lifeBase).toBe(1);
    });

    it('cycle increments by 1 on consecutive days within the same month', () => {
      const a = getFactors(makeSource('2000-01-07'));
      const b = getFactors(makeSource('2000-01-08'));
      const c = getFactors(makeSource('2000-01-09'));
      expect(b.cycle).toBe(a.cycle + 1);
      expect(c.cycle).toBe(b.cycle + 1);
    });

    it('cycle wraps back to 1 after 10 (shiftAndModulo period)', () => {
      const day10 = getFactors(makeSource('2000-01-16'));
      const day11 = getFactors(makeSource('2000-01-17'));
      expect(day10.cycle).toBe(10);
      expect(day11.cycle).toBe(1);
    });
  });
});
