import { describe, expect, it } from 'vitest';
import article from './article.js';

describe('`article()` function', () => {
  it('keeps positive safe integer heading levels', () => {
    expect(article({ head: 'Title', level: 2 })).toBe('## Title\n');
  });

  it.each([
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    7,
    Number.MAX_SAFE_INTEGER,
  ])('uses level 1 for invalid heading level %p', (level) => {
    expect(article({ head: 'Title', level })).toBe('# Title\n');
  });
});
