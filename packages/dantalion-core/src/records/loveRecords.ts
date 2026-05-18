import masterData from '../masterData.json' with { type: 'json' };

const { love } = masterData;

import type { AffinityLevel } from '../types/AffinityLevel.js';
import createGeniusRecords from '../utils/createGeniusRecords.js';

/** A list of love affinity by genius type. */
export default createGeniusRecords(love as AffinityLevel[][]);
