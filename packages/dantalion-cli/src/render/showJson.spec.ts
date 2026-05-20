import { describe, expect, it, vi } from 'vitest';
import showJson from './showJson.js';

describe('showJson', () => {
  it('writes the JSON-stringified value to console.info', () => {
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);
    try {
      showJson({ a: 1, b: 'two' });
      expect(infoSpy).toHaveBeenCalledOnce();
      const arg = infoSpy.mock.calls[0]?.[0] as string;
      const parsed = JSON.parse(arg);
      expect(parsed).toEqual({ a: 1, b: 'two' });
    } finally {
      infoSpy.mockRestore();
    }
  });

  it('handles null / undefined inputs without throwing', () => {
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);
    try {
      showJson(null);
      showJson(undefined);
      expect(infoSpy).toHaveBeenCalledTimes(2);
    } finally {
      infoSpy.mockRestore();
    }
  });
});
