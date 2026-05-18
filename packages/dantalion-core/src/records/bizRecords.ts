import masterData from '../masterData.json' with { type: 'json' };

const { biz } = masterData;

import type { AffinityLevel } from '../types/AffinityLevel.js';
import createGeniusRecords from '../utils/createGeniusRecords.js';

/** A list of business affinity by genius type. */
export default createGeniusRecords(biz as AffinityLevel[][]);
