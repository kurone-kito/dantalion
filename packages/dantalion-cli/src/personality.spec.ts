import { describe, expect, it } from 'vitest';
import command from './personality.js';

describe('personality command (in-process)', () => {
  describe('command metadata', () => {
    it('declares the expected commander wiring', () => {
      expect(command.command).toBe('personality <birthday>');
      expect(command.alias).toBe('ps');
      expect(command.description).toEqual(expect.any(String));
      expect(command.description.length).toBeGreaterThan(0);
    });
  });

  describe('getObject (delegates to dantalion-core.getPersonality)', () => {
    it('returns a Personality for a valid in-range date', () => {
      const result = command.getObject('1993-10-09');
      expect(result).toEqual(
        expect.objectContaining({
          cycle: expect.any(Number),
          inner: expect.any(String),
          outer: expect.any(String),
          workStyle: expect.any(String),
          lifeBase: expect.any(String),
          potentials: expect.any(Array),
        }),
      );
    });

    it('returns undefined for an out-of-range date', () => {
      expect(command.getObject('1700-01-01')).toBeUndefined();
    });

    it('returns undefined for a non-date string', () => {
      expect(command.getObject('not-a-date')).toBeUndefined();
    });
  });

  describe('getDescriptionAsync (delegates to dantalion-i18n)', () => {
    it('returns a Markdown string for a valid date', async () => {
      const md = await command.getDescriptionAsync('1993-10-09');
      expect(md).toEqual(expect.any(String));
      expect(md.length).toBeGreaterThan(0);
      // Should contain at least one Markdown heading.
      expect(md).toMatch(/^#/m);
    });
  });
});
