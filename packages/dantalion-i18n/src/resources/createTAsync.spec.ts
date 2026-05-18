import { describe, expect, it } from 'vitest';
import createTAsync from './createTAsync.js';

describe('`createTAsync()` function', () => {
  it('Get the function', async () =>
    expect(await createTAsync()).toEqual(expect.any(Function)));
});
