import type { Genius } from '@kurone-kito/dantalion-core';
import { describe, expect, it } from 'vitest';
import { createAccessors } from '../resources/createAccessorsAsync.js';
import createTAsync from '../resources/createTAsync.js';
import { getDetailMarkdown, getPersonalityMarkdown } from './index.js';

/**
 * Locale-by-locale tests for the Markdown renderers.
 *
 * The previous revision of this spec snapshotted every (locale ×
 * Genius × birthday) combination, producing a ~1.9 MB snapshot file
 * that was effectively unreviewable on PR diffs and encouraged
 * "snapshot updated, ship it" review habits. The structural
 * `toEqual(expect.any(String))` checks below remain the actual
 * contract — they assert that every combination produces a non-empty
 * Markdown string — and a single pinpoint snapshot per locale per
 * function survives as a corruption tripwire for canonical wording.
 */

const DETAIL_GENIUS_LIST: readonly (Genius | undefined)[] = [
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
  undefined,
];

const PERSONALITY_BIRTHDAYS: readonly string[] = [
  // Smallest list that covers every code path inside the renderer.
  '1873-02-01',
  '1873-02-02',
  '1873-02-03',
  '1873-02-04',
  '1873-02-05',
  '1873-02-06',
  '1873-02-07',
  '1873-02-08',
  '1873-02-09',
  '1873-02-10',
  '1873-02-11',
  '1873-02-12',
  '1873-02-13',
  '1873-02-14',
  '1873-02-17',
  '1873-02-21',
  '1873-02-22',
  '1873-02-23',
  '1873-02-24',
  '1873-02-26',
  '1873-03-03',
  '1873-03-06',
  '1873-03-07',
  '1873-03-08',
  '1873-03-09',
  '1873-03-10',
  '1873-03-11',
  '1873-03-12',
  '1873-03-13',
  '1873-03-14',
  '1873-03-15',
  '1873-04-05',
  '1873-04-06',
  '1873-04-07',
  '1873-04-08',
  '1873-04-09',
  '1873-04-10',
  '1873-04-11',
  '1873-04-12',
  '1873-04-13',
  '1873-04-14',
  '1873-05-06',
  '1873-05-07',
  '1873-05-08',
  '1873-05-09',
  '1873-05-10',
  '1873-05-11',
  '1873-05-12',
  '1873-05-13',
  '1873-05-14',
  '1873-05-15',
  '1873-06-06',
  '1873-06-07',
  '1873-06-08',
  '1873-06-09',
  '1873-06-10',
  '1873-06-11',
  '1873-06-12',
  '1873-06-13',
  '1873-06-14',
  '1873-06-15',
  '1873-07-07',
  '1873-07-08',
  '1873-07-09',
  '1873-07-10',
  '1873-07-11',
  '1873-07-12',
  '1873-07-13',
  '1873-07-14',
  '1873-07-15',
  '1873-07-16',
  '1873-08-08',
  '1873-08-09',
  '1873-08-10',
  '1873-08-11',
  '1873-08-12',
  '1873-08-13',
  '1873-08-14',
  '1873-08-15',
  '1873-08-16',
  '1873-08-17',
  '1873-09-08',
  '1873-09-09',
  '1873-09-10',
  '1873-09-11',
  '1873-09-12',
  '1873-09-13',
  '1873-09-14',
  '1873-09-15',
  '1873-09-16',
  '1873-09-17',
  '1873-10-08',
  '1873-10-11',
  '1873-10-13',
  '1873-10-14',
  '1873-10-15',
  '1873-10-16',
  '1873-10-17',
  '1873-11-08',
  '1873-11-09',
  '1873-11-10',
  '1873-11-11',
  '1873-11-12',
  '1873-11-13',
  '1873-11-14',
  '1873-11-15',
  '1873-11-16',
  '1873-11-17',
  '1874-02-04',
  '1874-02-05',
  '1874-02-06',
  '1874-02-07',
  '',
];

// Single canonical-wording tripwire per (locale, renderer). If a
// locale file is wholesale corrupted, this snapshot catches it; the
// structural checks below catch shape regressions for every other
// combination without bloating the snapshot file.
const TRIPWIRE_GENIUS: Genius = '555';
const TRIPWIRE_BIRTHDAY = '1873-02-01';

// Markdown produced by both renderers must look like Markdown: at
// least one heading marker (`#`) at line start. This is the cheapest
// structural check that distinguishes "rendered Markdown" from
// "accidentally empty / error string / unrendered template".
const MARKDOWN_HEADING = /^#/m;

describe.each(['en', 'ja'])('LANG=%s', (lng) => {
  describe('`getDetailMarkdown()` function', () => {
    it.each(
      DETAIL_GENIUS_LIST,
    )('(t, %p) => returns a Markdown string with at least one heading', async (genius) => {
      const accessors = createAccessors(await createTAsync({ lng }));
      const actual = getDetailMarkdown(accessors, genius);
      expect(actual).toEqual(expect.any(String));
      expect(actual.length).toBeGreaterThan(0);
      expect(actual).toMatch(MARKDOWN_HEADING);
    });

    it(`(t, ${TRIPWIRE_GENIUS}) — canonical wording tripwire`, async () => {
      const accessors = createAccessors(await createTAsync({ lng }));
      const actual = getDetailMarkdown(accessors, TRIPWIRE_GENIUS);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('`getPersonalityMarkdown()` function', () => {
    it.each(
      PERSONALITY_BIRTHDAYS,
    )('(t, %p) => returns a Markdown string with at least one heading', async (birthday) => {
      const accessors = createAccessors(await createTAsync({ lng }));
      const actual = getPersonalityMarkdown(accessors, birthday);
      expect(actual).toEqual(expect.any(String));
      expect(actual.length).toBeGreaterThan(0);
      expect(actual).toMatch(MARKDOWN_HEADING);
    });

    it(`(t, ${TRIPWIRE_BIRTHDAY}) — canonical wording tripwire`, async () => {
      const accessors = createAccessors(await createTAsync({ lng }));
      const actual = getPersonalityMarkdown(accessors, TRIPWIRE_BIRTHDAY);
      expect(actual).toMatchSnapshot();
    });
  });
});
