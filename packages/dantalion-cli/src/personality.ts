import { getPersonality } from '@kurone-kito/dantalion-core';
import type { Command } from './type';

const command: Command = {
  action: (birthday) => getPersonality(birthday),
  alias: 'ps',
  command: 'personality <birthday>',
  description: 'Show personality associated with the specified birthday.',
};

export default command;
