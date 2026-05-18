import masterData from '../masterData.json' with { type: 'json' };

const { lifeBase: table } = masterData;

import label from '../types/lifeBase.js';
import create2DAccessor from '../utils/create2DAccessor.js';

/** A table of the life base factor. */
export default create2DAccessor({ label, table });
