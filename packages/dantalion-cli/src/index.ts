import commander from 'commander';
import { version } from '../package.json';
import detail from './detail';
import personality from './personality';
import type { Result } from './type';

const showJson = (result: Result) =>
  // eslint-disable-next-line no-console
  console.info(JSON.stringify(result, null, 2));

[detail, personality].forEach(({ action, alias, command, description }) => {
  commander
    .command(command)
    .alias(alias)
    .description(description)
    .action((...args) => showJson(action(...args)));
});

commander.version(version);
commander.parse(process.argv);
if (process.argv.length < 1) {
  commander.help();
}
