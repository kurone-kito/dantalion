import { describe, expect, it, vi } from 'vitest';
import showMd from './showMd.js';

describe('showMd', () => {
  it('forwards the rendered Markdown to console.info', () => {
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);
    try {
      showMd('# heading\n\nbody text');
      expect(infoSpy).toHaveBeenCalledOnce();
      const arg = infoSpy.mock.calls[0]?.[0] as string;
      expect(typeof arg).toBe('string');
      expect(arg.length).toBeGreaterThan(0);
    } finally {
      infoSpy.mockRestore();
    }
  });

  it('handles an empty Markdown source', () => {
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);
    try {
      showMd('');
      expect(infoSpy).toHaveBeenCalledOnce();
    } finally {
      infoSpy.mockRestore();
    }
  });
});
