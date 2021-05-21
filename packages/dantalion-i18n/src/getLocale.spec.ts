import getLocale from './getLocale';

describe('`getLocale()` function', () => {
  describe.each([false, undefined])('getLocale(%p)', (forceEnv) => {
    it('Get the string', () =>
      expect(getLocale(forceEnv)).toEqual(expect.any(String)));
    it('Get the same value', () =>
      expect(getLocale(forceEnv)).toBe(getLocale()));
  });
  describe('getLocale(true)', () => {
    it('Get the string', () =>
      expect(getLocale(true)).toEqual(expect.any(String)));
  });
});
