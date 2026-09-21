import type { HeavenlyStem } from '../types/heavenlyStem.js';
import assertDefined from './assertDefined.js';
import type { Source2D } from './create2DAccessor.js';
import type { BirthdayDetails } from './getBirthdayDetails.js';
import shiftAndModulo from './shiftAndModulo.js';

/** Intermediate values that determine the factors of personality. */
export interface Factors {
  /** The factors that determine the sub-personality (cycle). */
  cycle: HeavenlyStem;
  /** Gets the coordinates of the table. */
  getXY: (value: number) => Source2D;
  /** The factors that determine the inner personality. */
  inner: number;
  /** The factors that determine the life base. */
  lifeBase: number;
  /** The factors that determine the outer personality. */
  outer: number;
  /** The factors that determine the potentials. */
  potentials: [number, number];
  /** The factors that determine the personality of working. */
  workStyle: number;
}

/** Source for calculating intermediate values. */
export interface FactorSource extends BirthdayDetails {
  monthlyCoefficient: number;
}

/**
 * Calculate the factors that determine the personality.
 * @param source Source for calculation.
 * @returns Intermediate values that determine the factors of personality.
 */
export default (source: FactorSource): Factors => {
  const {
    date,
    month: { early, month, shifted },
    monthlyCoefficient,
    year: { full },
  } = source;
  const lessThan = date < monthlyCoefficient;
  const adjustedYear = full - early();
  const adjustedHi = Math.floor(adjustedYear * 0.01);
  const adjustedLo = adjustedYear % 100;
  const outer = shiftAndModulo(month - (lessThan ? 1 : 0), 12) + 1;
  // +9 is an epoch alignment offset for the working-style cycle.
  const workStyle = full + 9 - early(lessThan);
  // The Heavenly Stem cycle has 10 stems, and a non-leap year is 365
  // days (365 % 10 === 5), so each calendar year the same date's stem
  // drifts ~5 positions; 5.25 folds in a quarter-day-per-year leap
  // correction on top of that drift, scaled across the 2-digit year
  // (adjustedLo).
  // The Gregorian century rule (a century is a leap year only when
  // divisible by 400) breaks the naive quarter-day-per-year assumption
  // at century boundaries; 4.25 carries that century-scale correction
  // forward, scaled across the century digits (adjustedHi).
  // 0.6 is the reduced form of the classic "30.6-day month"
  // approximation (the Julian Day Number month-length trick,
  // floor(30.6 * (month + 1))) used to advance the stem count by a
  // variable-length month's worth of days without a lookup table.
  // +7 is a fixed epoch offset aligning the computed index to stem 0
  // at the algorithm's reference date.
  // Int32Array's number-to-int32 coercion truncates toward zero
  // (ECMAScript ToInt32), which for these date-derived magnitudes
  // (always far inside the int32 range) is exactly Math.trunc.
  const cycle =
    Math.floor(adjustedLo * 5.25) +
    date +
    7 +
    Math.trunc(adjustedHi * 4.25) +
    Math.trunc((shifted + 1) * 0.6);
  // -2 is an epoch alignment offset for the potentials cycle.
  const potentials = [workStyle - 2, full * 2 + outer + 2].map((v) =>
    shiftAndModulo(v, 10),
  );
  return {
    cycle: shiftAndModulo(cycle, 10) as HeavenlyStem,
    getXY: (value: number): Source2D => ({ x: value - 1, y: cycle % 10 }),
    inner: shiftAndModulo(shifted * 6 + adjustedHi * 4 + cycle - 6, 12),
    lifeBase: date - monthlyCoefficient,
    outer: shiftAndModulo(outer, 12),
    potentials: [assertDefined(potentials[0]), assertDefined(potentials[1])],
    workStyle: shiftAndModulo(workStyle, 12),
  };
};
