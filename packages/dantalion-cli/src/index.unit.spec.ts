import { describe, expect, it, vi } from 'vitest';
import { buildProgram, runProgram } from './index.js';

describe('buildProgram (in-process)', () => {
  it('registers both subcommands', () => {
    const program = buildProgram();
    const commandNames = program.commands.map((c) => c.name());
    expect(commandNames).toContain('detail');
    expect(commandNames).toContain('personality');
  });

  it('registers the short aliases `dt` and `ps`', () => {
    const program = buildProgram();
    const aliasFor = (name: string) =>
      program.commands.find((c) => c.name() === name)?.aliases() ?? [];
    expect(aliasFor('detail')).toEqual(expect.arrayContaining(['dt']));
    expect(aliasFor('personality')).toEqual(expect.arrayContaining(['ps']));
  });

  it('exposes the package version', () => {
    const program = buildProgram();
    expect(program.version()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('registers the global --lang option with en/ja choices', () => {
    const program = buildProgram();
    const lang = program.options.find((option) => option.long === '--lang');
    expect(lang).toBeDefined();
    expect(lang?.argChoices).toEqual(['en', 'ja']);
  });

  it('each subcommand declares the `-r, --raw` option', () => {
    const program = buildProgram();
    for (const cmd of program.commands) {
      const raw = cmd.options.find((o) => o.long === '--raw');
      expect(
        raw,
        `subcommand "${cmd.name()}" must declare --raw`,
      ).toBeDefined();
      expect(raw?.short).toBe('-r');
    }
  });

  it('each subcommand carries a non-empty description', () => {
    const program = buildProgram();
    for (const cmd of program.commands) {
      expect(cmd.description().length).toBeGreaterThan(0);
    }
  });

  describe('action callbacks (via program.parseAsync)', () => {
    it('detail --raw triggers the showJson branch', async () => {
      const infoSpy = vi
        .spyOn(console, 'info')
        .mockImplementation(() => undefined);
      try {
        const program = buildProgram();
        await program.parseAsync(['node', 'cli', 'detail', '555', '--raw']);
        expect(infoSpy).toHaveBeenCalledOnce();
        const arg = infoSpy.mock.calls[0]?.[0];
        expect(typeof arg).toBe('string');
        const parsed = JSON.parse(String(arg));
        expect(parsed).toEqual(
          expect.objectContaining({ affinity: expect.any(Object) }),
        );
      } finally {
        infoSpy.mockRestore();
      }
    });

    it('personality (no --raw) triggers the showMd branch', async () => {
      const infoSpy = vi
        .spyOn(console, 'info')
        .mockImplementation(() => undefined);
      try {
        const program = buildProgram();
        await program.parseAsync(['node', 'cli', 'personality', '1993-10-09']);
        expect(infoSpy).toHaveBeenCalledOnce();
        const arg = infoSpy.mock.calls[0]?.[0];
        expect(typeof arg).toBe('string');
        expect(String(arg).length).toBeGreaterThan(0);
      } finally {
        infoSpy.mockRestore();
      }
    });
  });

  it('reports invalid action arguments on stderr with a non-zero exit code', async () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const previousExitCode = process.exitCode;
    process.exitCode = undefined;
    try {
      await runProgram(['node', 'cli', 'personality', 'not-a-date']);
      await runProgram(['node', 'cli', 'detail', 'INVALID']);
      expect(errorSpy).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/invalid birthday/i),
      );
      expect(errorSpy).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/invalid genius id/i),
      );
      expect(process.exitCode).toBe(1);
    } finally {
      process.exitCode = previousExitCode;
      errorSpy.mockRestore();
    }
  });
});
