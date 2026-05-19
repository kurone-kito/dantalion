import masterData from '../masterData.json' with { type: 'json' };

const { detailsMap } = masterData;

import type { AffinityLevel } from '../types/AffinityLevel.js';
import type { Brain } from '../types/brain.js';
import brain from '../types/brain.js';
import type { Communication } from '../types/communication.js';
import communication from '../types/communication.js';
import type { Genius } from '../types/genius.js';
import geniusTable from '../types/genius.js';
import type { Management } from '../types/management.js';
import management from '../types/management.js';
import type { Motivation } from '../types/motivation.js';
import motivation from '../types/motivation.js';
import type { Position } from '../types/position.js';
import position from '../types/position.js';
import type { Response } from '../types/response.js';
import response from '../types/response.js';
import type { Vector } from '../types/vector.js';
import vector from '../types/vector.js';
import assertDefined from '../utils/assertDefined.js';
import createGeniusRecord from '../utils/createGeniusRecord.js';
import bizRecords from './bizRecords.js';
import loveRecords from './loveRecords.js';

/** Type of the source. */
type DetailsSourceMap = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

/** The lists of affinity by genius type. */
export interface Affinity {
  /** for business. */
  biz: Record<Genius, AffinityLevel>;
  /** for romance. */
  love: Record<Genius, AffinityLevel>;
}

/** The detail for genius type. */
export interface Detail {
  /** The lists of affinity by genius type. */
  affinity: Affinity;
  /** The types of thought method. */
  brain: Brain;
  /** The types of dialogue policy. */
  communication: Communication;
  /** The types that the risk management method. */
  management: Management;
  /** The types of easy to the motivated environment. */
  motivation: Motivation;
  /** The types for role. */
  position: Position;
  /** The types for role. */
  response: Response;
  /** Vector of genius type. */
  vector: Vector;
}

/** The list that the details corresponding to personality type. */
export default createGeniusRecord(
  (detailsMap as DetailsSourceMap[]).map<Detail>((row, index) => {
    // Invariant: detailsMap, geniusTable, and the seven category arrays
    // are statically aligned in masterData.json (curated). The 100% test
    // coverage exercises every (index, row[i]) combination.
    const genius = assertDefined(geniusTable[index]);
    return {
      affinity: {
        biz: assertDefined(bizRecords[genius]),
        love: assertDefined(loveRecords[genius]),
      },
      brain: assertDefined(brain[row[5]]),
      communication: assertDefined(communication[row[0]]),
      management: assertDefined(management[row[1]]),
      motivation: assertDefined(motivation[row[4]]),
      position: assertDefined(position[row[3]]),
      response: assertDefined(response[row[2]]),
      vector: assertDefined(vector[row[6]]),
    };
  }),
);
