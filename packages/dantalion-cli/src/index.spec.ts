import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { beforeAll, describe, expect, it } from 'vitest';

const binPath = fileURLToPath(new URL('../dist/src/index.js', import.meta.url));
const { version: pkgVersion } = createRequire(import.meta.url)(
  '../package.json',
) as { version: string };

const runCli = (args: string[]) =>
  execa('node', [binPath, ...args], { reject: false });

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
