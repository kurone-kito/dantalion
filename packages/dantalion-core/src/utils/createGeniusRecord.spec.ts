import { describe, expect, it } from 'vitest';
import genius from '../types/genius.js';
import createGeniusRecord from './createGeniusRecord.js';

const NUMERIC_INPUT = genius.map((_, i) => i);
const STRING_INPUT = genius.map((_, i) => `val${i}`);

describe('createGeniusRecord', () => {
  describe('key structure', () => {
    it('produces a record with exactly the 12 canonical Genius IDs as keys', () => {
      const result = createGeniusRecord(NUMERIC_INPUT);
      expect(new Set(Object.keys(result))).toStrictEqual(new Set(genius));
    });

    it.each(
      genius.map((id, i) => [id, i] as [string, number]),
    )('Genius ID "%s" maps to input index %i', (id, index) => {
      const result = createGeniusRecord(NUMERIC_INPUT);
      expect(result[id as keyof typeof result]).toBe(index);
    });
  });

  describe('value type preservation (mutation guards)', () => {
    it('maps string values: each Genius ID holds the corresponding string', () => {
      const result = createGeniusRecord(STRING_INPUT);
      for (const [id, expected] of genius.map(
        (id, i) => [id, `val${i}`] as const,
      )) {
        expect(result[id as keyof typeof result]).toBe(expected);
      }
    });

    it('no Genius key returns undefined when factory is working correctly', () => {
      const result = createGeniusRecord(STRING_INPUT);
      const allDefined = genius.every(
        (id) => result[id as keyof typeof result] !== undefined,
      );
      expect(allDefined).toBe(true);
    });
  });

  describe('index-to-key correspondence', () => {
    it('first element (index 0) maps to "000"', () => {
      const result = createGeniusRecord(NUMERIC_INPUT);
      expect(result['000']).toBe(0);
    });

    it('last element (index 11) maps to "919"', () => {
      const result = createGeniusRecord(NUMERIC_INPUT);
      expect(result['919']).toBe(11);
    });

    it('produces a distinct value for each key (no aliasing)', () => {
      const result = createGeniusRecord(NUMERIC_INPUT);
      const values = Object.values(result);
      expect(new Set(values).size).toBe(genius.length);
    });
  });
});
