#!/usr/bin/env node

import commander from 'commander';
import 'ts-polyfill';
import { version } from '../package.json';
import detail from './detail';
import personality from './personality';

const showJson = (result: unknown) =>
  // eslint-disable-next-line no-console
  console.info(JSON.stringify(result, null, 2));

[detail, personality].forEach(({ action, alias, command, description }) => {
  commander
    .command(command)
    .alias(alias)
    .description(description)
    .action(async (...args) => showJson(await action(...args)));
});

commander.version(version);
commander.parse(process.argv);
if (process.argv.length < 1) {
  commander.help();
}
