import details, { Detail } from './records/details';

export { default as types, AllTypes } from './types';
export { Affinity, Detail } from './records/details';
export { AffinityLevel } from './types/AffinityLevel';
export { Brain } from './types/brain';
export { Communication } from './types/communication';
export { Genius } from './types/genius';
export { LifeBase } from './types/lifeBase';
export { Management } from './types/management';
export { Motivation } from './types/motivation';
export { Position } from './types/position';
export { Potential } from './types/potential';
export { Response } from './types/response';
export { Vector } from './types/vector';
export { default as getPersonality, Personality } from './utils/getPersonality';

export const getDetail = (genius: Genius): Detail => details[genius];
