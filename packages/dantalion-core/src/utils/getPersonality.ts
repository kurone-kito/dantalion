import geniusTable from '../records/geniusTable.js';
import getMonthlyCoefficients from '../records/getMonthlyCoefficients.js';
import lifeBaseCoefficients from '../records/lifeBaseCoefficients.js';
import lifeBaseTable from '../records/lifeBaseTable.js';
import potentialTable from '../records/potentialTable.js';
import type { Genius } from '../types/genius.js';
import type { LifeBase } from '../types/lifeBase.js';
import type { Potential } from '../types/potential.js';
import getBirthdayDetails from './getBirthdayDetails.js';
import getFactors from './getFactors.js';

/** The details for Personality. */
export interface Personality {
  /** The sub-personality (cycle). */
  cycle: number;
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
 * Ignore the time information.
 * @returns The object that the personality information.
 *
 * If the date is over the range, it will be `undefined`.
 */
export default (
  birth: ConstructorParameters<typeof Date>[0],
): Personality | undefined => {
  const birthObj = new Date(birth);
  const monthlyCoefficients = getMonthlyCoefficients(birthObj);
  if (Number.isNaN(monthlyCoefficients)) {
    return undefined;
  }
  const { month, ...details } = getBirthdayDetails(new Date(birthObj));
  const { cycle, getXY, inner, lifeBase, outer, potentials, workStyle } =
    getFactors({
      ...details,
      month,
      monthlyCoefficient: monthlyCoefficients,
    });
  const lifeBaseCoef = lifeBaseCoefficients(month.month, lifeBase);
  const p = potentials.map((v) => potentialTable(getXY(v)));
  return {
    cycle,
    inner: geniusTable(getXY(inner)),
    lifeBase: lifeBaseTable(getXY(lifeBaseCoef)),
    outer: geniusTable(getXY(outer)),
    potentials: [p[0], p[1]],
    workStyle: geniusTable(getXY(workStyle)),
  };
};
