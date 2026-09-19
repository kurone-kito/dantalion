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
const DATE_FORMAT_OPTIONS = {
  day: '2-digit',
  month: 'short',
  weekday: 'short',
  year: 'numeric',
} satisfies Intl.DateTimeFormatOptions;

/** Return a canonical locale or let Intl use the runtime default. */
const getValidLocale = (locale: string): string | undefined => {
  try {
    return Intl.getCanonicalLocales(locale)[0];
  } catch {
    return undefined;
  }
};

/** Format date-only strings without converting them through a local Date. */
const getDescriptionType = (birth: ParsableDate, locale: string): string => {
  const validLocale = getValidLocale(locale);
  if (typeof birth === 'string') {
    const match = DATE_ONLY_PATTERN.exec(birth);
    const [, year, month, day] = match ?? [];
    if (year !== undefined && month !== undefined && day !== undefined) {
      const date = new Date(0);
      date.setUTCFullYear(Number(year), Number(month) - 1, Number(day));
      date.setUTCHours(0, 0, 0, 0);
      return new Intl.DateTimeFormat(validLocale, {
        ...DATE_FORMAT_OPTIONS,
        timeZone: 'UTC',
      }).format(date);
    }
  }
  const date = new Date(birth);
  if (Number.isNaN(date.getTime())) return date.toDateString();
  return new Intl.DateTimeFormat(validLocale, DATE_FORMAT_OPTIONS).format(date);
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
 * Date-only strings in year-month-day form are interpreted as calendar dates
 * and formatted with UTC to prevent timezone shifts. Date and number inputs
 * use the local timezone of the resulting Date; their time components are not
 * rendered. The active accessor locale controls the formatted date text.
 * @returns The string that the personality information
 * as the Markdown format.
 *
 * If the date is over the range, it will be error message.
 */
export const getPersonalityMarkdown = (
  accessors: Accessors,
  birth: ParsableDate,
): string => {
  const result = getPersonality(birth);
  const desc = accessors.getDescription(
    getDescriptionType(birth, accessors.locale),
  );
  return result
    ? article({
        body: createPersonalityTemplate(result, accessors),
        head: `Dantalion: ${desc.personality}`,
      })
    : article({ head: `Dantalion: ${desc.invalid}` });
};
