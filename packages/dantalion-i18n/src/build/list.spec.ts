import { describe, expect, it } from 'vitest';
import { list } from './list.js';

describe('`list()` function', () => {
  it('omits undefined values', () => {
    expect(list('first', undefined, 'third')).toBe('- first\n- third\n');
  });

  it('returns an empty string when no values remain', () => {
    expect(list(undefined, undefined)).toBe('');
  });
});
