import masterData from '../masterData.json' with { type: 'json' };
import type { CalendarDate } from '../types/calendarDate.js';

const { monthlyCoefficients } = masterData;

const START_YEAR = 1873;
const START_MONTH = 2;

/**
 * Calculate the monthly coefficient index from the date.
 * @param date The date.
 */
const getIndex = (date: Date | CalendarDate) => {
  const month = date instanceof Date ? date.getMonth() + 1 : date.month;
  const year = date instanceof Date ? date.getFullYear() : date.year;
  return month - START_MONTH + 12 * (year - START_YEAR);
};

/** Get the monthly coefficient corresponding to the specified date. */
export default (date: Date | CalendarDate): number =>
  monthlyCoefficients[getIndex(date)] ?? Number.NaN;
