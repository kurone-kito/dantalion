#!/usr/bin/env node

import commander from 'commander';
import { version } from '../package.json';
import detail from './detail';
import personality from './personality';
import showJson from './render/showJson';

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
