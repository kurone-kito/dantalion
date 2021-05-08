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
import type { DetailsType, PersonalityType, VectorType } from './types';
import createAccessor, { ResourcesAccessor } from './createAccessor';
import getResourcesAsync from './getAsync';

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to the thought method.
 */
export const brain = createAccessor<DetailsType, Brain>('brain');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to dialogue policy.
 */
export const communication = createAccessor<DetailsType, Communication>(
  'communication'
);

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to natural personality.
 */
export const genius = createAccessor<PersonalityType, Genius>('genius');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to risk and return thinking in specific people.
 */
export const management = createAccessor<DetailsType, Management>('management');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to an environment that is easy to get motivated.
 */
export const motivation: ResourcesAccessor<string, Motivation, string> = {
  getAsync: async (key) => (await getResourcesAsync())(`motivation.${key}`),
  getCategoryDetailAsync: async () =>
    (await getResourcesAsync())('motivation.detail'),
};

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to a talented role.
 */
export const position = createAccessor<DetailsType, Position>('position');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to on-site or behind.
 */
export const response = createAccessor<DetailsType, Response>('response');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to the major classification of personality.
 */
export const vector = createAccessor<VectorType, Vector>('vector');
