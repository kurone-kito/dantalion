import type { Detail } from './records/details.js';
import details from './records/details.js';
import type { Genius } from './types/genius.js';

export type { Affinity, Detail } from './records/details.js';
export type { AffinityLevel } from './types/AffinityLevel.js';
export type { Brain } from './types/brain.js';
export type { Communication } from './types/communication.js';
export type { Genius } from './types/genius.js';
export type { AllTypes } from './types/index.js';
export { default as types } from './types/index.js';
export type { LifeBase } from './types/lifeBase.js';
export type { Management } from './types/management.js';
export type { Motivation } from './types/motivation.js';
export type { Position } from './types/position.js';
export type { Potential } from './types/potential.js';
export type { Response } from './types/response.js';
export type { Vector } from './types/vector.js';
export type { Personality } from './utils/getPersonality.js';
export { default as getPersonality } from './utils/getPersonality.js';
export { default as toCC } from './utils/toCC.js';

export const getDetail = (genius: Genius): Detail => details[genius];
