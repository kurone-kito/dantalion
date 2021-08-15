#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../package.json';
import detail from './detail';
import personality from './personality';
import showJson from './render/showJson';
import showMd from './render/showMd';

[detail, personality].forEach(
  ({ getDescriptionAsync, getObject, alias, command, description }) =>
    program
      .command(command)
      .alias(alias)
      .option('-r, --raw', 'Returns the raw JSON')
      .description(description)
      .action(async (arg, { raw }) =>
        !raw
          ? showMd(await getDescriptionAsync(arg))
          : showJson(await getObject(arg))
      )
);

program.version(version);
program.parse(process.argv);
if (process.argv.length < 1) {
  program.help();
}
