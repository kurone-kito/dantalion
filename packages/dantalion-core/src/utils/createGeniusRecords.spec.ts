import { describe, expect, it } from 'vitest';
import genius from '../types/genius.js';
import createGeniusRecords from './createGeniusRecords.js';

const TABLE = genius.map((_, row) => genius.map((_, col) => row * 12 + col));

describe('createGeniusRecords', () => {
  describe('key structure', () => {
    it('outer keys are exactly the 12 canonical Genius IDs', () => {
      const result = createGeniusRecords(TABLE);
      expect(new Set(Object.keys(result))).toStrictEqual(new Set(genius));
    });

    it('each inner record also has exactly the 12 canonical Genius IDs as keys', () => {
      const result = createGeniusRecords(TABLE);
      for (const id of genius) {
        expect(
          new Set(Object.keys(result[id as keyof typeof result])),
        ).toStrictEqual(new Set(genius));
      }
    });
  });

  describe('value correspondence', () => {
    it('result["000"]["000"] equals input[0][0]', () => {
      const result = createGeniusRecords(TABLE);
      expect(result['000']['000']).toBe(TABLE[0]?.[0]);
    });

    it('result["000"]["919"] equals input[0][11] (last col of first row)', () => {
      const result = createGeniusRecords(TABLE);
      expect(result['000']['919']).toBe(TABLE[0]?.[11]);
    });

    it('result["919"]["000"] equals input[11][0] (first col of last row)', () => {
      const result = createGeniusRecords(TABLE);
      expect(result['919']['000']).toBe(TABLE[11]?.[0]);
    });

    it('result["919"]["919"] equals input[11][11] (last col of last row)', () => {
      const result = createGeniusRecords(TABLE);
      expect(result['919']['919']).toBe(TABLE[11]?.[11]);
    });

    it.each(
      genius.flatMap((rowId, row) =>
        genius.map((colId, col) => [rowId, colId, row * 12 + col] as const),
      ),
    )('result[%s][%s] === %i', (rowId, colId, expected) => {
      const result = createGeniusRecords(TABLE);
      const outer = result[rowId as keyof typeof result];
      expect(outer[colId as keyof typeof outer]).toBe(expected);
    });
  });

  describe('row independence (row-walker mutation guard)', () => {
    it('each outer key maps to a distinct inner record (rows not aliased)', () => {
      const result = createGeniusRecords(TABLE);
      const rows = genius.map((id) => result[id as keyof typeof result]);
      const first = rows[0];
      for (let i = 1; i < rows.length; i++) {
        expect(rows[i]).not.toStrictEqual(first);
      }
    });
  });
});
