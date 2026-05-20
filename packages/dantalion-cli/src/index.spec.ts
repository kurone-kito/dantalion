import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { beforeAll, describe, expect, it } from 'vitest';

const binPath = fileURLToPath(new URL('../dist/src/index.js', import.meta.url));
const { version: pkgVersion } = createRequire(import.meta.url)(
  '../package.json',
) as { version: string };

const runCli = (args: string[], env?: Record<string, string>) =>
  execa(
    'node',
    [binPath, ...args],
    env
      ? { reject: false, env: { ...process.env, ...env } }
      : { reject: false },
  );

describe('dantalion CLI smoke', () => {
  beforeAll(async () => {
    // The `pretest:vitest` script in this package's package.json runs
    // `pnpm run build` before vitest, so `dist/src/index.js` should be
    // present whenever the tests are launched through the standard
    // `test:vitest` or `pnpm run test` paths. This probe is a defensive
    // sanity check that surfaces a clear error if someone bypasses the
    // pretest hook (e.g., invoking `vitest run` directly against an
    // empty dist).
    const probe = await runCli(['--version']);
    if (probe.exitCode !== 0) {
      throw new Error(
        `CLI dist artifact missing or broken at ${binPath}. Run \`pnpm --filter @kurone-kito/dantalion-cli run build\` first.`,
      );
    }
  });

  describe('personality subcommand', () => {
    it('--raw outputs JSON with the expected personality keys', async () => {
      const { exitCode, stdout } = await runCli([
        'personality',
        '1993-10-09',
        '--raw',
      ]);
      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed).toEqual(
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

    it('renders Markdown without --raw', async () => {
      const { exitCode, stdout } = await runCli(['personality', '1993-10-09']);
      expect(exitCode).toBe(0);
      expect(stdout.length).toBeGreaterThan(0);
    });

    it('the `ps` alias accepts the same args as `personality`', async () => {
      const { exitCode, stdout } = await runCli(['ps', '1993-10-09', '--raw']);
      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed).toEqual(
        expect.objectContaining({ cycle: expect.any(Number) }),
      );
    });

    it('-r short flag is equivalent to --raw', async () => {
      const { exitCode, stdout } = await runCli([
        'personality',
        '1993-10-09',
        '-r',
      ]);
      expect(exitCode).toBe(0);
      expect(() => JSON.parse(stdout)).not.toThrow();
    });
  });

  describe('detail subcommand', () => {
    it('--raw outputs JSON with the expected detail keys', async () => {
      const { exitCode, stdout } = await runCli(['detail', '555', '--raw']);
      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed).toEqual(
        expect.objectContaining({
          affinity: expect.any(Object),
        }),
      );
    });

    it('renders Markdown without --raw', async () => {
      const { exitCode, stdout } = await runCli(['detail', '555']);
      expect(exitCode).toBe(0);
      expect(stdout.length).toBeGreaterThan(0);
    });

    it('the `dt` alias accepts the same args as `detail`', async () => {
      const { exitCode, stdout } = await runCli(['dt', '555', '--raw']);
      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(parsed).toEqual(
        expect.objectContaining({ affinity: expect.any(Object) }),
      );
    });

    it('with no genius argument, lists the available Genius IDs', async () => {
      const { exitCode, stdout } = await runCli(['detail']);
      expect(exitCode).toBe(0);
      for (const id of ['000', '555', '919']) {
        expect(stdout).toContain(id);
      }
    });
  });

  describe('locale selection (Intl.DateTimeFormat default)', () => {
    it('LANG=ja_JP.UTF-8 produces Japanese-character output', async () => {
      const { exitCode, stdout } = await runCli(['detail', '555'], {
        LANG: 'ja_JP.UTF-8',
      });
      expect(exitCode).toBe(0);
      // Hiragana / Katakana / CJK Unified Ideographs ranges.
      expect(stdout).toMatch(/[぀-ゟ゠-ヿ一-鿿]/);
    });

    it('LANG=en_US.UTF-8 produces non-empty, CJK-free output', async () => {
      const { exitCode, stdout } = await runCli(['detail', '555'], {
        LANG: 'en_US.UTF-8',
      });
      expect(exitCode).toBe(0);
      expect(stdout.length).toBeGreaterThan(0);
      // marked-terminal rewrites Markdown headings into ANSI-styled
      // text, so the rendered output may not contain a literal `#`.
      // Assert the locale is honored by requiring zero CJK code
      // points (the same range the ja_JP test checks for presence of).
      expect(stdout).not.toMatch(/[぀-ゟ゠-ヿ一-鿿]/);
    });
  });

  describe('invalid input handling', () => {
    it('an invalid date returns a soft "undefined" payload (current behavior)', async () => {
      // The `personality.ts` command swallows out-of-range dates by
      // emitting `undefined` and exiting 0. Lock the behavior in so a
      // future change to make this fail-closed is visible.
      const { exitCode, stdout } = await runCli([
        'personality',
        'NaN',
        '--raw',
      ]);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe('undefined');
    });

    it('an invalid Genius ID falls back to the type-list output', async () => {
      // `getDetail()` returns undefined for unknown Genius IDs and the
      // CLI then prints the canonical Genius list via `types.genius`.
      // Lock the behavior in.
      const { exitCode, stdout } = await runCli(['detail', 'INVALID', '--raw']);
      expect(exitCode).toBe(0);
      const parsed = JSON.parse(stdout);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toContain('555');
    });
  });

  describe('global flags', () => {
    it('--help lists both subcommands and exits 0', async () => {
      const { exitCode, stdout } = await runCli(['--help']);
      expect(exitCode).toBe(0);
      expect(stdout).toContain('personality');
      expect(stdout).toContain('detail');
    });

    it('--version emits the package.json version', async () => {
      const { exitCode, stdout } = await runCli(['--version']);
      expect(exitCode).toBe(0);
      expect(stdout.trim()).toBe(pkgVersion);
    });
  });
});
