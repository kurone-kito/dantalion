#!/usr/bin/env node

import { realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve as resolvePath } from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import detail from './detail.js';
import personality from './personality.js';
import showJson from './render/showJson.js';
import showMd from './render/showMd.js';

/**
 * Resolve the published package version. The relative path between
 * this module and the canonical `package.json` differs between source
 * (`src/index.ts` → `../package.json`) and the built artifact
 * (`dist/src/index.js` → `../../package.json`), so try both before
 * falling back to a sentinel.
 */
const readVersion = (): string => {
  const require = createRequire(import.meta.url);
  for (const candidate of ['../../package.json', '../package.json']) {
    try {
      return (require(candidate) as { version: string }).version;
    } catch {
      // Fall through to next candidate.
    }
  }
  return '0.0.0-unknown';
};

/**
 * Build the commander `Program` for the dantalion CLI. Exposed so a
 * unit spec can inspect the wiring (registered subcommands, version)
 * without triggering `process.argv` parsing as a side effect of
 * importing this module.
 */
export const buildProgram = (): Command => {
  const program = new Command();
  for (const {
    getDescriptionAsync,
    getObject,
    alias,
    command,
    description,
  } of [detail, personality]) {
    program
      .command(command)
      .alias(alias)
      .option('-r, --raw', 'Returns the raw JSON')
      .description(description)
      .action(async (arg: string | undefined, { raw }: { raw?: boolean }) => {
        if (raw) {
          showJson(await getObject(arg));
        } else {
          showMd(await getDescriptionAsync(arg));
        }
      });
  }
  program.version(readVersion());
  return program;
};

// Run only when this module is the program entry point (i.e., invoked
// as `dantalion` from the shell). Under `vitest` the test file imports
// `buildProgram` and the block below stays inert.
//
// Normalization needed because:
//   * `argv[1]` may be relative (`node dist/src/index.js`) — `pathToFileURL`
//     rejects relative paths;
//   * `argv[1]` may be a symlink (npm/yarn `node_modules/.bin`, global
//     installs) — the symlink path differs from `import.meta.url`'s
//     resolved target.
// Resolve to an absolute realpath on both sides before comparing.
const isProgramEntry = (): boolean => {
  if (!argv[1]) return false;
  try {
    const argvRealpath = realpathSync(resolvePath(argv[1]));
    const moduleRealpath = realpathSync(fileURLToPath(import.meta.url));
    return argvRealpath === moduleRealpath;
  } catch {
    return false;
  }
};
if (isProgramEntry()) {
  const program = buildProgram();
  program.parse(argv);
  if (argv.length < 1) {
    program.help();
  }
}
