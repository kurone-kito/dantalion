import { describe, expect, it } from 'vitest';
import command from './detail.js';

describe('detail command (in-process)', () => {
  describe('command metadata', () => {
    it('declares the expected commander wiring', () => {
      expect(command.command).toBe('detail [genius]');
      expect(command.alias).toBe('dt');
      expect(command.description).toEqual(expect.any(String));
      expect(command.description.length).toBeGreaterThan(0);
    });
  });

  describe('getObject (delegates to dantalion-core.getDetail)', () => {
    it('returns a Detail for a known Genius ID', () => {
      const result = command.getObject('555');
      expect(result).toEqual(
        expect.objectContaining({ affinity: expect.any(Object) }),
      );
    });

    it('returns the Genius list for an unknown Genius ID', () => {
      const result = command.getObject('INVALID');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('555');
      expect(result).toContain('000');
    });

    it('returns the Genius list when no argument is supplied', () => {
      const result = command.getObject(undefined);
      expect(Array.isArray(result)).toBe(true);
      expect((result as readonly string[]).length).toBe(12);
    });
  });

  describe('getDescriptionAsync (delegates to dantalion-i18n)', () => {
    it('returns a Markdown string for a known Genius', async () => {
      const md = await command.getDescriptionAsync('555');
      expect(md).toEqual(expect.any(String));
      expect(md.length).toBeGreaterThan(0);
      expect(md).toMatch(/^#/m);
    });
  });
});
