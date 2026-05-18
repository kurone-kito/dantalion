import masterData from '../masterData.json' with { type: 'json' };

const { potential: table } = masterData;

import label from '../types/potential.js';
import create2DAccessor from '../utils/create2DAccessor.js';

/** The table of potential factors. */
export default create2DAccessor({ label, table });
