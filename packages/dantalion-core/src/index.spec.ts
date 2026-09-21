import { describe, expect, it } from 'vitest';
import type { Genius } from './index.js';
import { getDetail, getPersonality, toCC, types } from './index.js';
import {
  type DetailTestData,
  getDetailTestData,
  getPersonalityTestData,
} from './tests/index.js';

describe('integration testing', () => {
  describe('get all types', () => {
    it('exposes the frozen HeavenlyStem values', () => {
      expect(types.heavenlyStem).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(Object.isFrozen(types.heavenlyStem)).toBe(true);
    });
  });

  describe('get the details', () => {
    it('returns undefined for an out-of-union runtime key', () => {
      const invalidKey: string = 'bogus';
      expect(getDetail(invalidKey as Genius)).toBeUndefined();
    });

    it('returns undefined for inherited prototype keys', () => {
      const prototypeKeys: string[] = ['__proto__', 'constructor'];
      prototypeKeys.forEach((key) => {
        expect(getDetail(key as Genius)).toBeUndefined();
      });
    });

    it.each(
      Object.entries(getDetailTestData()) as [Genius, DetailTestData][],
    )('Outputs the same value as the data source from all genius: %s', (genius, expected) => {
      const result = getDetail(genius);
      if (result === undefined) {
        throw new Error(`Expected details for known Genius ${genius}`);
      }
      const { affinity, ...actual } = result;
      expect(actual).toStrictEqual(expected);
    });
  });
  describe('get the personality', () => {
    const testData = getPersonalityTestData();
    it.each([
      '1873-01-31',
      '2051-01-01',
      'NaN',
      '',
    ])('Return an undefined value when specified an out ranged date: “%s”', (date) =>
      expect(getPersonality(date)).toBeUndefined());
    it('Outputs the same value as the data source from all dates in the range', () => {
      testData.forEach((source) => {
        const result = getPersonality(source.date)!;
        expect({ ...result, date: source.date }).toStrictEqual(source);
      });
    });
    it('Outputs the string from the toCC function', () => {
      // biome-ignore lint/style/noNonNullAssertion: testData is a fixture; first row is guaranteed.
      const first = testData[0]!;
      expect(toCC(first)).toEqual(expect.any(String));
    });
  });
});
