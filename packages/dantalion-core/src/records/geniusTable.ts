import masterData from '../masterData.json' with { type: 'json' };

const { genius: table } = masterData;

import label from '../types/genius.js';
import create2DAccessor from '../utils/create2DAccessor.js';

/** The table of genius factors. */
export default create2DAccessor({ label, table });
