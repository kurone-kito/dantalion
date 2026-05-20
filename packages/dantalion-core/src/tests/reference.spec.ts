/**
 * Independent reference spec for `getPersonality()`.
 *
 * Unlike `../index.spec.ts`, this file does not consume the
 * `personality.json` regression fixture — it asserts dantalion output
 * against an externally documented (date → 60甲子 number → animal →
 * Genius ID) chain. A passing test proves the implementation is
 * consistent with the published Bazi day-stem-branch sequence and the
 * published 動物占い® 60-character table, not just with its own past
 * output.
 *
 * Sources for the reference data:
 *
 * - 60甲子 day-cycle anchor: 2000-01-07 = 甲子 (#1). Verified against
 *   multiple public Bazi calendars (万年暦) and widely-cited Bazi
 *   anchor tables. The sequence advances day-stem (mod 10) and
 *   day-branch (mod 12) by one per calendar day, producing the
 *   60-day repeating cycle.
 * - 60-character → animal mapping: published by 個性心理學研究所 /
 *   動物占い® and reproduced verbatim by
 *   https://sachikatsu.love/60-classification-characters/
 *
 * The (animal → Genius ID) mapping itself is dantalion-internal, so
 * the test fails if any of those 12 assignments are silently swapped
 * while the rest of the algorithm continues to compute the same 60
 * 甲子 position — exactly the class of bug the self-generated
 * `personality.json` baseline cannot detect.
 *
 * Coverage: 60 sequential entries for 60甲子 positions 1..60
 * (2000-01-07 .. 2000-03-06) plus 5 dedicated boundary entries
 * (1924-02-05 historical anchor, 1984-02-04 立春 boundary,
 * 2024-02-29 modern leap day, 2024-12-31 / 2025-01-01 year
 * boundary). 2000-02-29 is already covered by the main sequence as
 * 60甲子 #54.
 */
import { describe, expect, it } from 'vitest';
import getPersonality from '../utils/getPersonality.js';

interface ReferenceEntry {
  readonly date: string;
  /** Position in the 60甲子 day cycle (1..60). */
  readonly sixtyKoshi: number;
  /** 干支 (day stem-branch pair). */
  readonly ganzhi: string;
  /** Day stem position (1..10) — equivalent to dantalion's `cycle`. */
  readonly stem: number;
  /** External 動物占い® animal name. */
  readonly animal: string;
  /** Dantalion Genius ID corresponding to the external animal. */
  readonly expectedInnerGenius: string;
}

const REFERENCE_ENTRIES: readonly ReferenceEntry[] = [
  {
    date: '2000-01-07',
    sixtyKoshi: 1,
    ganzhi: '甲子',
    stem: 1,
    animal: 'cheetah',
    expectedInnerGenius: '888',
  },
  {
    date: '2000-01-08',
    sixtyKoshi: 2,
    ganzhi: '乙丑',
    stem: 2,
    animal: 'raccoonDog',
    expectedInnerGenius: '789',
  },
  {
    date: '2000-01-09',
    sixtyKoshi: 3,
    ganzhi: '丙寅',
    stem: 3,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-01-10',
    sixtyKoshi: 4,
    ganzhi: '丁卯',
    stem: 4,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-01-11',
    sixtyKoshi: 5,
    ganzhi: '戊辰',
    stem: 5,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-01-12',
    sixtyKoshi: 6,
    ganzhi: '己巳',
    stem: 6,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2000-01-13',
    sixtyKoshi: 7,
    ganzhi: '庚午',
    stem: 7,
    animal: 'cheetah',
    expectedInnerGenius: '888',
  },
  {
    date: '2000-01-14',
    sixtyKoshi: 8,
    ganzhi: '辛未',
    stem: 8,
    animal: 'raccoonDog',
    expectedInnerGenius: '789',
  },
  {
    date: '2000-01-15',
    sixtyKoshi: 9,
    ganzhi: '壬申',
    stem: 9,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-01-16',
    sixtyKoshi: 10,
    ganzhi: '癸酉',
    stem: 10,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-01-17',
    sixtyKoshi: 11,
    ganzhi: '甲戌',
    stem: 1,
    animal: 'fawn',
    expectedInnerGenius: '108',
  },
  {
    date: '2000-01-18',
    sixtyKoshi: 12,
    ganzhi: '乙亥',
    stem: 2,
    animal: 'elephant',
    expectedInnerGenius: '024',
  },
  {
    date: '2000-01-19',
    sixtyKoshi: 13,
    ganzhi: '丙子',
    stem: 3,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-01-20',
    sixtyKoshi: 14,
    ganzhi: '丁丑',
    stem: 4,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-01-21',
    sixtyKoshi: 15,
    ganzhi: '戊寅',
    stem: 5,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-01-22',
    sixtyKoshi: 16,
    ganzhi: '己卯',
    stem: 6,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-01-23',
    sixtyKoshi: 17,
    ganzhi: '庚辰',
    stem: 7,
    animal: 'fawn',
    expectedInnerGenius: '108',
  },
  {
    date: '2000-01-24',
    sixtyKoshi: 18,
    ganzhi: '辛巳',
    stem: 8,
    animal: 'elephant',
    expectedInnerGenius: '024',
  },
  {
    date: '2000-01-25',
    sixtyKoshi: 19,
    ganzhi: '壬午',
    stem: 9,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-01-26',
    sixtyKoshi: 20,
    ganzhi: '癸未',
    stem: 10,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-01-27',
    sixtyKoshi: 21,
    ganzhi: '甲申',
    stem: 1,
    animal: 'pegasus',
    expectedInnerGenius: '000',
  },
  {
    date: '2000-01-28',
    sixtyKoshi: 22,
    ganzhi: '乙酉',
    stem: 2,
    animal: 'pegasus',
    expectedInnerGenius: '000',
  },
  {
    date: '2000-01-29',
    sixtyKoshi: 23,
    ganzhi: '丙戌',
    stem: 3,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-01-30',
    sixtyKoshi: 24,
    ganzhi: '丁亥',
    stem: 4,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-01-31',
    sixtyKoshi: 25,
    ganzhi: '戊子',
    stem: 5,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-02-01',
    sixtyKoshi: 26,
    ganzhi: '己丑',
    stem: 6,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-02-02',
    sixtyKoshi: 27,
    ganzhi: '庚寅',
    stem: 7,
    animal: 'pegasus',
    expectedInnerGenius: '000',
  },
  {
    date: '2000-02-03',
    sixtyKoshi: 28,
    ganzhi: '辛卯',
    stem: 8,
    animal: 'pegasus',
    expectedInnerGenius: '000',
  },
  {
    date: '2000-02-04',
    sixtyKoshi: 29,
    ganzhi: '壬辰',
    stem: 9,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-02-05',
    sixtyKoshi: 30,
    ganzhi: '癸巳',
    stem: 10,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-02-06',
    sixtyKoshi: 31,
    ganzhi: '甲午',
    stem: 1,
    animal: 'elephant',
    expectedInnerGenius: '024',
  },
  {
    date: '2000-02-07',
    sixtyKoshi: 32,
    ganzhi: '乙未',
    stem: 2,
    animal: 'fawn',
    expectedInnerGenius: '108',
  },
  {
    date: '2000-02-08',
    sixtyKoshi: 33,
    ganzhi: '丙申',
    stem: 3,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-02-09',
    sixtyKoshi: 34,
    ganzhi: '丁酉',
    stem: 4,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-02-10',
    sixtyKoshi: 35,
    ganzhi: '戊戌',
    stem: 5,
    animal: 'sheep',
    expectedInnerGenius: '025',
  },
  {
    date: '2000-02-11',
    sixtyKoshi: 36,
    ganzhi: '己亥',
    stem: 6,
    animal: 'wolf',
    expectedInnerGenius: '001',
  },
  {
    date: '2000-02-12',
    sixtyKoshi: 37,
    ganzhi: '庚子',
    stem: 7,
    animal: 'elephant',
    expectedInnerGenius: '024',
  },
  {
    date: '2000-02-13',
    sixtyKoshi: 38,
    ganzhi: '辛丑',
    stem: 8,
    animal: 'fawn',
    expectedInnerGenius: '108',
  },
  {
    date: '2000-02-14',
    sixtyKoshi: 39,
    ganzhi: '壬寅',
    stem: 9,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-02-15',
    sixtyKoshi: 40,
    ganzhi: '癸卯',
    stem: 10,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-02-16',
    sixtyKoshi: 41,
    ganzhi: '甲辰',
    stem: 1,
    animal: 'raccoonDog',
    expectedInnerGenius: '789',
  },
  {
    date: '2000-02-17',
    sixtyKoshi: 42,
    ganzhi: '乙巳',
    stem: 2,
    animal: 'cheetah',
    expectedInnerGenius: '888',
  },
  {
    date: '2000-02-18',
    sixtyKoshi: 43,
    ganzhi: '丙午',
    stem: 3,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2000-02-19',
    sixtyKoshi: 44,
    ganzhi: '丁未',
    stem: 4,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-02-20',
    sixtyKoshi: 45,
    ganzhi: '戊申',
    stem: 5,
    animal: 'koala',
    expectedInnerGenius: '125',
  },
  {
    date: '2000-02-21',
    sixtyKoshi: 46,
    ganzhi: '己酉',
    stem: 6,
    animal: 'monkey',
    expectedInnerGenius: '919',
  },
  {
    date: '2000-02-22',
    sixtyKoshi: 47,
    ganzhi: '庚戌',
    stem: 7,
    animal: 'raccoonDog',
    expectedInnerGenius: '789',
  },
  {
    date: '2000-02-23',
    sixtyKoshi: 48,
    ganzhi: '辛亥',
    stem: 8,
    animal: 'cheetah',
    expectedInnerGenius: '888',
  },
  {
    date: '2000-02-24',
    sixtyKoshi: 49,
    ganzhi: '壬子',
    stem: 9,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2000-02-25',
    sixtyKoshi: 50,
    ganzhi: '癸丑',
    stem: 10,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-02-26',
    sixtyKoshi: 51,
    ganzhi: '甲寅',
    stem: 1,
    animal: 'lion',
    expectedInnerGenius: '100',
  },
  {
    date: '2000-02-27',
    sixtyKoshi: 52,
    ganzhi: '乙卯',
    stem: 2,
    animal: 'lion',
    expectedInnerGenius: '100',
  },
  {
    date: '2000-02-28',
    sixtyKoshi: 53,
    ganzhi: '丙辰',
    stem: 3,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-02-29',
    sixtyKoshi: 54,
    ganzhi: '丁巳',
    stem: 4,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2000-03-01',
    sixtyKoshi: 55,
    ganzhi: '戊午',
    stem: 5,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2000-03-02',
    sixtyKoshi: 56,
    ganzhi: '己未',
    stem: 6,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-03-03',
    sixtyKoshi: 57,
    ganzhi: '庚申',
    stem: 7,
    animal: 'lion',
    expectedInnerGenius: '100',
  },
  {
    date: '2000-03-04',
    sixtyKoshi: 58,
    ganzhi: '辛酉',
    stem: 8,
    animal: 'lion',
    expectedInnerGenius: '100',
  },
  {
    date: '2000-03-05',
    sixtyKoshi: 59,
    ganzhi: '壬戌',
    stem: 9,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2000-03-06',
    sixtyKoshi: 60,
    ganzhi: '癸亥',
    stem: 10,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  // Boundary entries beyond the main 60-day window.
  {
    date: '1924-02-05',
    sixtyKoshi: 51,
    ganzhi: '甲寅',
    stem: 1,
    animal: 'lion',
    expectedInnerGenius: '100',
  },
  {
    date: '1984-02-04',
    sixtyKoshi: 5,
    ganzhi: '戊辰',
    stem: 5,
    animal: 'blackPanther',
    expectedInnerGenius: '012',
  },
  {
    date: '2024-02-29',
    sixtyKoshi: 60,
    ganzhi: '癸亥',
    stem: 10,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2024-12-31',
    sixtyKoshi: 6,
    ganzhi: '己巳',
    stem: 6,
    animal: 'tiger',
    expectedInnerGenius: '555',
  },
  {
    date: '2025-01-01',
    sixtyKoshi: 7,
    ganzhi: '庚午',
    stem: 7,
    animal: 'cheetah',
    expectedInnerGenius: '888',
  },
];

describe('reference: getPersonality matches external 60甲子 + 動物占い® mapping', () => {
  it('covers at least 30 entries', () => {
    expect(REFERENCE_ENTRIES.length).toBeGreaterThanOrEqual(30);
  });

  it('main sequence covers exactly 60甲子 positions 1..60 once each', () => {
    // Restrict to entries within the documented anchor window so that
    // boundary entries (which intentionally duplicate some positions
    // from outside the window) cannot mask gaps in the main sequence.
    const ANCHOR_WINDOW_START = '2000-01-07';
    const ANCHOR_WINDOW_END = '2000-03-06';
    const mainSequence = REFERENCE_ENTRIES.filter(
      (e) => e.date >= ANCHOR_WINDOW_START && e.date <= ANCHOR_WINDOW_END,
    );
    expect(mainSequence).toHaveLength(60);
    const positions = mainSequence
      .map((e) => e.sixtyKoshi)
      .sort((a, b) => a - b);
    expect(positions).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
  });

  it('covers every Genius ID at least once', () => {
    const ALL_GENIUS = [
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
    ];
    const seen = new Set(REFERENCE_ENTRIES.map((e) => e.expectedInnerGenius));
    for (const g of ALL_GENIUS) {
      expect(seen.has(g), `Genius ${g} should appear in entries`).toBe(true);
    }
  });

  it.each(
    REFERENCE_ENTRIES,
  )('$date ($ganzhi #$sixtyKoshi $animal) → inner=$expectedInnerGenius', ({
    date,
    expectedInnerGenius,
    stem,
  }) => {
    const p = getPersonality(date);
    expect(p, `getPersonality(${date}) should not be undefined`).toBeDefined();
    if (!p) return;
    expect(p.inner).toBe(expectedInnerGenius);
    expect(p.cycle).toBe(stem);
  });
});
