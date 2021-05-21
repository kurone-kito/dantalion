import {
  Genius,
  getDetail,
  getPersonality,
  types,
} from '@kurone-kito/dantalion-core';
import createAccessorsAsync, {
  Accessors,
} from '../resources/createAccessorsAsync';
import article from './article';
import { list } from './list';
import { createDetailsTemplate, createPersonalityTemplate } from './template';

type ParsableDate = ConstructorParameters<typeof Date>[0];

/**
 * Get the personality information asynchronously.
 * @param genius The types of personality.
 * @param accessors The accessors instance for resources.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If you specified the `undefined` value as an argument or omitted it,
 * it would be a list of the available types.
 */
export const getDetailMarkdownAsync = async (
  genius?: Genius,
  accessors?: Accessors
): Promise<string> => {
  // eslint-disable-next-line no-param-reassign
  accessors ??= await createAccessorsAsync();
  const result = genius && getDetail(genius);
  const desc = accessors.getDescription(genius);
  return genius && result
    ? article({
        body: createDetailsTemplate(genius, result, accessors),
        head: `Dantalion: ${desc.detail}`,
      })
    : article({
        body: list(...types.genius),
        head: `Dantalion: ${desc.details}`,
      });
};

/**
 * Get the personality information corresponding
 * to the specified birthday asynchronously.
 * @param birth Specify a birthday within the range from February 1, 1873,
 * to December 31, 2050.
 *
 * Ignore the _time_ information.
 * @param accessors The accessors instance for resources.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If the date is over the range, it will be error message.
 */
export const getPersonalityMarkdownAsync = async (
  birth: ParsableDate,
  accessors?: Accessors
): Promise<string> => {
  // eslint-disable-next-line no-param-reassign
  accessors ??= await createAccessorsAsync();
  const result = getPersonality(birth);
  const desc = accessors.getDescription(new Date(birth).toDateString());
  return result
    ? article({
        body: createPersonalityTemplate(result, accessors),
        head: `Dantalion: ${desc.personality}`,
      })
    : article({ head: `Dantalion: ${desc.invalid}` });
};
