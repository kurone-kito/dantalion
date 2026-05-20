import { describe, expect, it } from 'vitest';
import assertDefined from './assertDefined.js';

describe('assertDefined', () => {
  it.each<[string, unknown]>([
    ['string', 'value'],
    ['empty string', ''],
    ['number', 42],
    ['zero', 0],
    ['negative number', -1],
    ['boolean true', true],
    ['boolean false', false],
    ['null', null],
    ['object', { ok: true }],
    ['empty array', []],
    ['NaN', Number.NaN],
  ])('returns the value unchanged for a defined %s', (_label, value) => {
    expect(assertDefined(value)).toBe(value);
  });

  it('throws when value is undefined', () => {
    expect(() => assertDefined(undefined)).toThrowError(
      /assertDefined: value is undefined/,
    );
  });

  it('throws with the caller-supplied message when provided', () => {
    expect(() =>
      assertDefined(undefined, 'custom invariant violation'),
    ).toThrowError(/custom invariant violation/);
  });

  it('throws an Error instance (not a primitive)', () => {
    try {
      assertDefined(undefined);
      expect.fail('assertDefined should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it('narrows the type so the result is non-nullable (compile-time check via runtime use)', () => {
    const maybe: number | undefined = 5;
    const definite: number = assertDefined(maybe);
    // If this line type-checks at build time and runs at test time, the
    // narrowing contract is honored. Vitest's `expect` does not exercise
    // types directly; the build (tsc) is the contract enforcer here.
    expect(definite).toBe(5);
  });
});
