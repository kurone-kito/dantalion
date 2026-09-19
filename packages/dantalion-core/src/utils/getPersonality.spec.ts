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
});
