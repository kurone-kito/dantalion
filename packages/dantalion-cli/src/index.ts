#!/usr/bin/env node

import { createRequire } from 'node:module';
import { Command } from 'commander';
import detail from './detail.js';
import personality from './personality.js';
import showJson from './render/showJson.js';
import showMd from './render/showMd.js';

const { version } = createRequire(import.meta.url)('../package.json') as {
  version: string;
};

const program = new Command();

for (const { getDescriptionAsync, getObject, alias, command, description } of [
  detail,
  personality,
]) {
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

program.version(version);
program.parse(process.argv);
if (process.argv.length < 1) {
  program.help();
}
