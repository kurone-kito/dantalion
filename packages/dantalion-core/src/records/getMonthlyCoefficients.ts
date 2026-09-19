import masterData from '../masterData.json' with { type: 'json' };

const { monthlyCoefficients } = masterData;

const START_YEAR = 1873;
const START_MONTH = 2;

/**
 * Calculate the monthly coefficient index from the date.
 * @param date The date.
 */
const getIndex = (date: ConstructorParameters<typeof Date>[0]) => {
  const to = new Date(date);
  return to.getMonth() + 1 - START_MONTH + 12 * (to.getFullYear() - START_YEAR);
};

/** Get the monthly coefficient corresponding to the specified date. */
export default (date: ConstructorParameters<typeof Date>[0]): number =>
  monthlyCoefficients[getIndex(date)] ?? Number.NaN;
