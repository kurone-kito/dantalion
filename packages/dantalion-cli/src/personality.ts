import { getPersonality } from '@kurone-kito/dantalion-core';
import {
  createAccessorsAsync,
  getPersonalityMarkdown,
} from '@kurone-kito/dantalion-i18n';
import type { Command } from './type.js';

const DATE_ONLY_PATTERN = /^\d{4}-\d{1,2}-\d{1,2}$/;

const validate = (birthday?: string): string | undefined => {
  if (
    birthday !== undefined &&
    DATE_ONLY_PATTERN.test(birthday) &&
    getPersonality(birthday) !== undefined
  ) {
    return undefined;
  }
  return `Invalid birthday "${birthday ?? ''}". Expected a date from 1873-02-01 through 2050-12-31.`;
};

const command: Command = {
  validate,
  getDescriptionAsync: async (birthday, { lang } = {}) =>
    getPersonalityMarkdown(await createAccessorsAsync(lang), birthday ?? ''),
  getObject: (birthday) =>
    birthday === undefined ? undefined : getPersonality(birthday),
  alias: 'ps',
  command: 'personality <birthday>',
  description: 'Show personality associated with the specified birthday.',
};

export default command;
