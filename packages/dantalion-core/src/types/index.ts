import type { Brain } from './brain.js';
import brain from './brain.js';
import type { Communication } from './communication.js';
import communication from './communication.js';
import type { Genius } from './genius.js';
import genius from './genius.js';
import type { LifeBase } from './lifeBase.js';
import lifeBase, { cc as lifeBaseCC } from './lifeBase.js';
import type { Management } from './management.js';
import management from './management.js';
import type { Motivation } from './motivation.js';
import motivation from './motivation.js';
import type { Position } from './position.js';
import position from './position.js';
import type { Potential } from './potential.js';
import potential, { cc as potentialCC } from './potential.js';
import type { Response } from './response.js';
import response from './response.js';
import type { Vector } from './vector.js';
import vector from './vector.js';
/** All types list. */
export interface AllTypes {
  /** The list that the types of thought methods. */
  readonly brain: readonly Brain[];
  /** The list that the types of dialogue policy. */
  readonly communication: readonly Communication[];
  /** The list of personality types. */
  readonly genius: readonly Genius[];
  /** The list that the base of ego type. */
  readonly lifeBase: readonly LifeBase[];
  /** The list that the base of ego type. */
  readonly lifeBaseCC: Record<LifeBase, string>;
  /** The list of the types that the risk management method. */
  readonly management: readonly Management[];
  /** The list of the types that easy to the motivated environment. */
  readonly motivation: readonly Motivation[];
  /** The list of role types. */
  readonly position: readonly Position[];
  /** The list of the types that the potential. */
  readonly potential: readonly Potential[];
  /** The list of the types that the potential. */
  readonly potentialCC: Record<Potential, string>;
  /** The list of the types that the role. */
  readonly response: readonly Response[];
  /** The list of personality types. */
  readonly vector: readonly Vector[];
}

/** All types list. */
export default Object.freeze<AllTypes>({
  brain,
  communication,
  genius,
  lifeBase,
  lifeBaseCC,
  management,
  motivation,
  position,
  potential,
  potentialCC,
  response,
  vector,
});
