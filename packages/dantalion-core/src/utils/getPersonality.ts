import geniusTable from '../records/geniusTable.js';
import getMonthlyCoefficients from '../records/getMonthlyCoefficients.js';
import lifeBaseCoefficients from '../records/lifeBaseCoefficients.js';
import lifeBaseTable from '../records/lifeBaseTable.js';
import potentialTable from '../records/potentialTable.js';
import type { CalendarDate } from '../types/calendarDate.js';
import type { Genius } from '../types/genius.js';
import type { HeavenlyStem } from '../types/heavenlyStem.js';
import type { LifeBase } from '../types/lifeBase.js';
import type { Potential } from '../types/potential.js';
import assertDefined from './assertDefined.js';
import getBirthdayDetails from './getBirthdayDetails.js';
import getFactors from './getFactors.js';

const DATE_ONLY_PATTERN = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const isRealCalendarDate = (year: number, month: number, day: number) => {
  if (month < 1 || month > 12 || day < 1) {
    return false;
  }
  const daysInMonth =
    month === 2 && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month - 1];
  return daysInMonth !== undefined && day <= daysInMonth;
};

/** Parse date-only strings into calendar components before native Date parsing. */
const normalizeBirth = (
  birth: ConstructorParameters<typeof Date>[0],
): Date | CalendarDate | undefined => {
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
  const calendarDate = {
    date: Number(day),
    month: Number(month),
    year: Number(year),
  };
  return isRealCalendarDate(
    calendarDate.year,
    calendarDate.month,
    calendarDate.date,
  )
    ? calendarDate
    : undefined;
};

/** The details for Personality. */
export interface Personality {
  /** The sub-personality (cycle). */
  cycle: HeavenlyStem;
  /** The inner personality. */
  inner: Genius;
  /** The life base. */
  lifeBase: LifeBase;
  /** The outer personality. */
  outer: Genius;
  /** The potential. */
  potentials: [Potential, Potential];
  /** The personality at working. */
  workStyle: Genius;
}

/**
 * Get the personality information corresponding to the specified birthday.
 * @param birth Specify a birthday within the range from February 1, 1873,
 * to December 31, 2050.
 *
 * Date-only strings in year-month-day form are interpreted as local calendar
 * dates; impossible calendar days return `undefined`. Date and number inputs
 * use the local calendar date of the resulting Date, and time information is
 * ignored after the caller normalizes the input without re-validating its
 * calendar components.
 * @returns The object that the personality information.
 *
 * If the date is over the supported range or a date-only string does not
 * represent a real calendar day, it will be `undefined`.
 */
export default (
  birth: ConstructorParameters<typeof Date>[0],
): Personality | undefined => {
  const birthObj = normalizeBirth(birth);
  if (birthObj === undefined) {
    return undefined;
  }
  const monthlyCoefficient = getMonthlyCoefficients(birthObj);
  if (Number.isNaN(monthlyCoefficient)) {
    return undefined;
  }
  const birthdayDetails = getBirthdayDetails(birthObj);
  const { month } = birthdayDetails;
  const { cycle, getXY, inner, lifeBase, outer, potentials, workStyle } =
    getFactors({
      ...birthdayDetails,
      monthlyCoefficient,
    });
  const lifeBaseCoef = lifeBaseCoefficients(month.month, lifeBase);
  const p = potentials.map((v) => potentialTable(getXY(v)));
  return {
    cycle,
    inner: geniusTable(getXY(inner)),
    lifeBase: lifeBaseTable(getXY(lifeBaseCoef)),
    outer: geniusTable(getXY(outer)),
    potentials: [assertDefined(p[0]), assertDefined(p[1])],
    workStyle: geniusTable(getXY(workStyle)),
  };
};
