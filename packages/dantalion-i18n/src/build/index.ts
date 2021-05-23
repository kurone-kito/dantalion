import {
  Genius,
  getDetail,
  getPersonality,
  types,
} from '@kurone-kito/dantalion-core';
import type { Accessors } from '../resources/createAccessorsAsync';
import article from './article';
import { list } from './list';
import { createDetailsTemplate, createPersonalityTemplate } from './template';

type ParsableDate = ConstructorParameters<typeof Date>[0];

/**
 * Get the personality information.
 * @param accessors The accessors instance for resources.
 * @param genius The types of personality.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If you specified the `undefined` value as an argument or omitted it,
 * it would be a list of the available types.
 */
export const getDetailMarkdown = (
  accessors: Accessors,
  genius?: Genius
): string => {
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
 * Get the personality information corresponding to the specified birthday.
 * @param accessors The accessors instance for resources.
 * @param birth Specify a birthday within the range from February 1, 1873,
 * to December 31, 2050.
 *
 * Ignore the _time_ information.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If the date is over the range, it will be error message.
 */
export const getPersonalityMarkdown = (
  accessors: Accessors,
  birth: ParsableDate
): string => {
  const result = getPersonality(birth);
  const desc = accessors.getDescription(new Date(birth).toDateString());
  return result
    ? article({
        body: createPersonalityTemplate(result, accessors),
        head: `Dantalion: ${desc.personality}`,
      })
    : article({ head: `Dantalion: ${desc.invalid}` });
};
