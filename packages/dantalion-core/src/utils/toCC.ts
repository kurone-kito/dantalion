import { cc as lifeBaseCC } from '../types/lifeBase.js';
import { cc as potentialCC } from '../types/potential.js';
import type { Personality } from './getPersonality.js';

/**
 * Create a CC string from personality object.
 *
 * Maintainer verdict (2026-07-14): the potentials segment is emitted in
 * reverse order via `reduceRight`. This output is CANCODE-compatible
 * and stays as-is, but public CANCODE sources document only the
 * 9-digit portion of the code; the reversed letter-suffix order is
 * intended but unverified against the unpublished full-code spec.
 * @param personality Specify the personality object.
 * @return The CC string.
 */
export default (personality: Personality): string => {
  const { cycle, inner, lifeBase, outer, potentials, workStyle } = personality;
  const c1 = cycle % 10;
  const pcc = potentials.reduceRight(
    (acc, cur) => `${acc}-${potentialCC[cur]}`,
    '',
  );
  return `${inner}-${outer}-${workStyle}-${inner}${c1}-${lifeBaseCC[lifeBase]}${pcc}`;
};
