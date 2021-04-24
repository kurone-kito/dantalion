import type {
  Brain,
  Communication,
  Genius,
  Management,
  Motivation,
  Position,
  Response,
  Vector,
} from '@kurone-kito/dantalion-core';
import type {
  DetailsType,
  PersonalityType,
  VectorType,
} from './resources/types';
import getResourcesAccessor, { ResourcesAccessor } from './resources';
import getResourcesAsync from './resources/t';

export type {
  DetailsBaseType,
  DetailsType,
  PersonalityType,
  VectorType,
} from './resources/types';
export type { ResourcesAccessor } from './resources';

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to the thought method.
 */
export const brain = getResourcesAccessor<DetailsType, Brain>('brain');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to dialogue policy.
 */
export const communication = getResourcesAccessor<DetailsType, Communication>(
  'communication'
);

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to natural personality.
 */
export const genius = getResourcesAccessor<PersonalityType, Genius>('genius');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to risk and return thinking in specific people.
 */
export const management = getResourcesAccessor<DetailsType, Management>(
  'management'
);

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to an environment that is easy to get motivated.
 */
export const motivation: ResourcesAccessor<string, Motivation> = {
  getAsync: async (key) => (await getResourcesAsync())(`motivation.${key}`),
  getCategoryDetailAsync: async () =>
    (await getResourcesAsync())('motivation.detail'),
};

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to a talented role.
 */
export const position = getResourcesAccessor<DetailsType, Position>('position');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to on-site or behind.
 */
export const response = getResourcesAccessor<DetailsType, Response>('response');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to the major classification of personality.
 */
export const vector = getResourcesAccessor<VectorType, Vector>('vector');
