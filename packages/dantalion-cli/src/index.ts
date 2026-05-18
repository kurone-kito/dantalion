#!/usr/bin/env node

import { createRequire } from 'node:module';
import commander from 'commander';
import detail from './detail.js';
import personality from './personality.js';
import showJson from './render/showJson.js';
import showMd from './render/showMd.js';

const { version } = createRequire(import.meta.url)('../package.json') as {
  version: string;
};

for (const { getDescriptionAsync, getObject, alias, command, description } of [
  detail,
  personality,
]) {
  commander
    .command(command)
    .alias(alias)
    .option('-r, --raw', 'Returns the raw JSON')
    .description(description)
    .action(async (arg, { raw }) => {
      if (raw) {
        showJson(await getObject(arg));
      } else {
        showMd(await getDescriptionAsync(arg));
      }
    });
}

commander.version(version);
commander.parse(process.argv);
if (process.argv.length < 1) {
  commander.help();
}
