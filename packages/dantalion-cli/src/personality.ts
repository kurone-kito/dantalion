import { getPersonality } from '@kurone-kito/dantalion-core';
import { getDescriptionAsync } from '@kurone-kito/dantalion-i18n';
import article from './toMarkdown/article';
import { personalityAsync } from './toMarkdown/template';
import type { Command } from './type';

const command: Command = {
  getDescriptionAsync: async (birthday) => {
    const b = birthday as string;
    const result = getPersonality(b);
    const date = new Date(b);
    const desc = await getDescriptionAsync(
      Number.isNaN(date.getTime()) ? b : date.toDateString()
    );
    return result
      ? article({
          body: await personalityAsync(result),
          head: `Dantalion: ${desc?.personality}`,
        })
      : article({ head: `Dantalion: ${desc?.invalid}` });
  },
  getObject: (birthday) => getPersonality(birthday as string),
  alias: 'ps',
  command: 'personality <birthday>',
  description: 'Show personality associated with the specified birthday.',
};

export default command;
