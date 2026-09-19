import type { Genius } from '@kurone-kito/dantalion-core';
import { getDetail, getPersonality, types } from '@kurone-kito/dantalion-core';
import type { Accessors } from '../resources/createAccessorsAsync.js';
import article from './article.js';
import { list } from './list.js';
import {
  createDetailsTemplate,
  createPersonalityTemplate,
} from './template.js';

type ParsableDate = ConstructorParameters<typeof Date>[0];

const DATE_ONLY_PATTERN = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;

/** Parse date-only strings as local calendar dates before native Date parsing. */
const normalizeBirth = (birth: ParsableDate): Date => {
  if (typeof birth !== 'string') {
    return new Date(birth);
  }
  const match = DATE_ONLY_PATTERN.exec(birth);
  if (!match) {
    return new Date(birth);
  }
  const [, year, month, day] = match;
  if (year === undefined || month === undefined || day === undefined) {
    return new Date(birth);
  }
  const date = new Date(0);
  date.setFullYear(Number(year), Number(month) - 1, Number(day));
  date.setHours(0, 0, 0, 0);
  return date;
};

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
  genius?: Genius,
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
 * Date-only strings in year-month-day form are interpreted as local calendar
 * dates. Date and number inputs use the local calendar date of the resulting
 * Date, and time information is ignored after the input is normalized.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If the date is over the range, it will be error message.
 */
export const getPersonalityMarkdown = (
  accessors: Accessors,
  birth: ParsableDate,
): string => {
  const normalizedBirth = normalizeBirth(birth);
  const result = getPersonality(normalizedBirth);
  const desc = accessors.getDescription(normalizedBirth.toDateString());
  return result
    ? article({
        body: createPersonalityTemplate(result, accessors),
        head: `Dantalion: ${desc.personality}`,
      })
    : article({ head: `Dantalion: ${desc.invalid}` });
};
