import type { CalendarDate } from '../types/calendarDate.js';

/** Details for a month. */
export interface MonthDetails {
  /**
   * Gets 1 if it is January, or February when `february` is `true`;
   * 0 otherwise.
   * @param february Specifies whether to return 1 even in February.
   *
   * If omitted, it's `true`.
   */
  early(february?: boolean): number;
  /** The month. */
  month: number;
  /**
   * It contains the month from 3 to 14, with January and February
   * shifted to 13 and 14 respectively.
   */
  shifted: number;
}

/** Details for a year. */
export interface YearDetails {
  /** A year with four digits. */
  full: number;
  /** Upper two digits of the year */
  hi: number;
  /** Lower two digits of the year */
  lo: number;
}

/** Details for the birthday. */
export interface BirthdayDetails {
  /** A date of the birthday. */
  date: number;
  /** Details for a month. */
  month: MonthDetails;
  /** Details for a year. */
  year: YearDetails;
}

/**
 * Calculate the details of the birthday.
 * @param date Birthday.
 */
export default (date: Date | CalendarDate): BirthdayDetails => {
  const day = date instanceof Date ? date.getDate() : date.date;
  const month = date instanceof Date ? date.getMonth() + 1 : date.month;
  const year = date instanceof Date ? date.getFullYear() : date.year;
  const early: MonthDetails['early'] = (containFebruary = true) =>
    month === 1 || (month === 2 && containFebruary) ? 1 : 0;
  return {
    date: day,
    month: { early, month, shifted: month + early() * 12 },
    year: { full: year, hi: Math.floor(year * 0.01), lo: year % 100 },
  };
};
