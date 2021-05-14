import { Genius, getDetail, types } from '@kurone-kito/dantalion-core';
import { getDescriptionAsync } from '@kurone-kito/dantalion-i18n';
import article from './toMarkdown/article';
import { list } from './toMarkdown/list';
import { detailsAsync } from './toMarkdown/template';
import type { Command } from './type';

const command: Command = {
  getDescriptionAsync: async (detail) => {
    const type = detail as Genius;
    const result = getDetail(type);
    const desc = await getDescriptionAsync(type);
    return result
      ? article({
          body: await detailsAsync(type, result),
          head: `Dantalion: ${desc?.detail}`,
        })
      : article({
          head: `Dantalion: ${desc?.details}`,
          body: list(...types.genius),
        });
  },
  getObject: (detail) => getDetail(detail as Genius) || types.genius,
  alias: 'dt',
  command: 'detail [genius]',
  description:
    'Show detail of genius. If omitted the argument, show a list of genius types.',
};

export default command;
