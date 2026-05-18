import { describe, expect, it } from 'vitest';
import getLocale from './getLocale.js';

describe('`getLocale()` function', () => {
  describe('getLocale()', () => {
    it('Get the string', () => expect(getLocale()).toEqual(expect.any(String)));
  });
});
