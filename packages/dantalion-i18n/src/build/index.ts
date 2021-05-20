import {
  Genius,
  getDetail,
  getPersonality,
  types,
} from '@kurone-kito/dantalion-core';
import { getDescriptionAsync } from '../resources/accessors';
import article from './article';
import { list } from './list';
import { detailsAsync, personalityAsync } from './template';

/**
 * Get the personality information corresponding to the specified birthday.
 * @param birth Specify a birthday within the range from February 1, 1873,
 * to December 31, 2050.
 *
 * Ignore the _time_ information.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If the date is over the range, it will be error message.
 */
export const getPersonalityMarkdownAsync = async (
  birth: ConstructorParameters<typeof Date>[0]
): Promise<string> => {
  const result = getPersonality(birth);
  const desc = await getDescriptionAsync(new Date(birth).toDateString());
  return result
    ? article({
        body: await personalityAsync(result),
        head: `Dantalion: ${desc?.personality}`,
      })
    : article({ head: `Dantalion: ${desc?.invalid}` });
};

/**
 * Get the personality information.
 * @param genius The types of personality.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If you specified the `undefined` value as an argument or omitted it,
 * it would be a list of the available types.
 */
export const getDetailMarkdownAsync = async (
  genius?: Genius
): Promise<string> => {
  const result = genius && getDetail(genius);
  const desc = await getDescriptionAsync(genius);
  return genius && result
    ? article({
        body: await detailsAsync(genius, result),
        head: `Dantalion: ${desc?.detail}`,
      })
    : article({
        head: `Dantalion: ${desc?.details}`,
        body: list(...types.genius),
      });
};
