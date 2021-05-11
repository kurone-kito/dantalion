import { getDetail, Genius, types } from '@kurone-kito/dantalion-core';
import type { Command } from './type';

const command: Command = {
  getObject: (detail) => getDetail(detail as Genius) || types.genius,
  alias: 'dt',
  command: 'detail [genius]',
  description:
    'Show detail of genius. If omitted the argument, show a list of genius types.',
};

export default command;
