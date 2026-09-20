import type { Genius } from '@kurone-kito/dantalion-core';
import { getDetail, types } from '@kurone-kito/dantalion-core';
import {
  createAccessorsAsync,
  getDetailMarkdown,
} from '@kurone-kito/dantalion-i18n';
import type { Command } from './type.js';

const getGenius = (value?: string): Genius | undefined =>
  types.genius.find((genius) => genius === value);

const validate = (value?: string): string | undefined => {
  if (value === undefined || getGenius(value) !== undefined) {
    return undefined;
  }
  return `Invalid Genius ID "${value}". Valid Genius IDs: ${types.genius.join(', ')}.`;
};

const command: Command = {
  validate,
  getDescriptionAsync: async (detail, { lang } = {}) =>
    getDetailMarkdown(await createAccessorsAsync(lang), getGenius(detail)),
  getObject: (detail) => {
    const genius = getGenius(detail);
    return genius === undefined
      ? types.genius
      : (getDetail(genius) ?? types.genius);
  },
  alias: 'dt',
  command: 'detail [genius]',
  description:
    'Show detail of genius. If omitted the argument, show a list of genius types.',
};

export default command;
