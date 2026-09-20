import { describe, expect, it } from 'vitest';
import getPersonality from './getPersonality.js';

describe('getPersonality date normalization', () => {
  it.each([
    ['1993-10-09', new Date(1993, 9, 9)],
    ['1993-1-9', new Date(1993, 0, 9)],
  ])('interprets date-only string %s as a local calendar date', (value, date) => {
    expect(getPersonality(value)).toStrictEqual(getPersonality(date));
  });

  it('uses the local calendar day for Date values with time information', () => {
    expect(getPersonality(new Date(1993, 9, 9, 23, 59, 59, 999))).toStrictEqual(
      getPersonality(new Date(1993, 9, 9)),
    );
  });

  it('keeps a date-only calendar day distinct across skipped local dates', () => {
    expect(getPersonality('2011-12-30')).not.toStrictEqual(
      getPersonality('2011-12-31'),
    );
  });

  it.each([
    '2000-02-30',
    '2001-02-29',
    '2000-04-31',
    '2000-13-01',
    '2000-00-10',
  ])('rejects impossible date-only calendar day %s', (value) => {
    expect(getPersonality(value)).toBeUndefined();
  });

  it.each([
    '2000-02-29',
    '1873-02-01',
    '2050-12-31',
  ])('accepts real date-only calendar day %s', (value) => {
    expect(getPersonality(value)).toBeDefined();
  });

  it('does not revalidate Date or number inputs after caller normalization', () => {
    const normalizedDate = new Date(2000, 1, 30);

    expect(getPersonality(normalizedDate)).toStrictEqual(
      getPersonality('2000-03-01'),
    );
    expect(getPersonality(normalizedDate.getTime())).toStrictEqual(
      getPersonality(normalizedDate),
    );
  });
});
