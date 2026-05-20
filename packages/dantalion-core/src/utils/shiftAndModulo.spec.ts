import { describe, expect, it } from 'vitest';
import shiftAndModulo from './shiftAndModulo.js';

describe('shiftAndModulo', () => {
  it.each<[number, number, number]>([
    [1, 10, 1],
    [2, 10, 2],
    [9, 10, 9],
    [10, 10, 10],
    [11, 10, 1],
    [12, 10, 2],
    [21, 10, 1],
  ])('shiftAndModulo(%i, %i) === %i (positive small)', (a, n, expected) => {
    expect(shiftAndModulo(a, n)).toBe(expected);
  });

  it('produces a value in the half-open range (0, n] for any positive dividend', () => {
    for (let a = 0; a <= 200; a++) {
      const r = shiftAndModulo(a, 12);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(12);
    }
  });

  it('always returns a positive value for negative dividends', () => {
    for (let a = -50; a < 0; a++) {
      const r = shiftAndModulo(a, 10);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(10);
    }
  });

  it('returns 1 for any input when n === 1', () => {
    for (let a = -10; a <= 10; a++) {
      expect(shiftAndModulo(a, 1)).toBe(1);
    }
  });

  it('handles large values without overflow surprises', () => {
    expect(shiftAndModulo(1_000_000, 12)).toBeGreaterThanOrEqual(1);
    expect(shiftAndModulo(1_000_000, 12)).toBeLessThanOrEqual(12);
    expect(shiftAndModulo(1_000_001, 12)).toBe(
      ((shiftAndModulo(1_000_000, 12) - 1 + 1) % 12) + 1,
    );
  });
});
