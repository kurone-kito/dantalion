import { describe, expect, it } from 'vitest';
import create2DAccessor from './create2DAccessor.js';

describe('create2DAccessor', () => {
  const label = ['a', 'b', 'c'] as const;
  const table: readonly number[][] = [
    [0, 1, 2],
    [2, 0, 1],
    [1, 2, 0],
  ];
  const accessor = create2DAccessor({ label, table });

  it.each<[number, number, string]>([
    [0, 0, 'a'],
    [1, 0, 'b'],
    [2, 0, 'c'],
    [0, 1, 'c'],
    [1, 1, 'a'],
    [2, 1, 'b'],
    [0, 2, 'b'],
    [1, 2, 'c'],
    [2, 2, 'a'],
  ])('({ x: %i, y: %i }) === "%s"', (x, y, expected) => {
    expect(accessor({ x, y })).toBe(expected);
  });

  it('defaults x and y to 0 when omitted', () => {
    expect(accessor({})).toBe('a');
    expect(accessor({ x: 1 })).toBe('b');
    expect(accessor({ y: 1 })).toBe('c');
  });

  it('throws via assertDefined when y is out of range', () => {
    expect(() => accessor({ x: 0, y: 99 })).toThrowError(/assertDefined/);
  });

  it('throws via assertDefined when x is out of range', () => {
    expect(() => accessor({ x: 99, y: 0 })).toThrowError(/assertDefined/);
  });

  it('throws via assertDefined when the resolved label index is out of range', () => {
    const labelTooShort = ['a'] as const;
    const tableWithHighIndex: readonly number[][] = [[5]];
    const sparseAccessor = create2DAccessor({
      label: labelTooShort,
      table: tableWithHighIndex,
    });
    expect(() => sparseAccessor({ x: 0, y: 0 })).toThrowError(/assertDefined/);
  });
});
