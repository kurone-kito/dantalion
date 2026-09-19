import { getPersonality } from '@kurone-kito/dantalion-core';
import {
  createAccessorsAsync,
  getPersonalityMarkdown,
} from '@kurone-kito/dantalion-i18n';
import type { Command } from './type.js';

const command: Command = {
  getDescriptionAsync: async (birthday, { lang } = {}) =>
    getPersonalityMarkdown(
      await createAccessorsAsync(lang),
      birthday as string,
    ),
  getObject: (birthday) => getPersonality(birthday as string),
  alias: 'ps',
  command: 'personality <birthday>',
  description: 'Show personality associated with the specified birthday.',
};

export default command;
