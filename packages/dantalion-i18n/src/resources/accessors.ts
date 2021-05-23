import type {
  Brain,
  Communication,
  Genius,
  LifeBase,
  Management,
  Motivation,
  Position,
  Response,
  Vector,
} from '@kurone-kito/dantalion-core';
import type {
  DesctiptionsType,
  DetailsType,
  PersonalityDetailType,
  PersonalityType,
  VectorType,
} from './types';
import createAccessor, { ResourcesAccessor, getAsync } from './createAccessor';
import getResourcesAsync from './getTAsync';

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to the thought method.
 * @deprecated Use the `Accessors.brain` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const brain = createAccessor<DetailsType, Brain>('brain');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to dialogue policy.
 * @deprecated Use the `Accessors.communication` instance property
 * instead of this constant. This will may no longer the next update.
 */
export const communication =
  createAccessor<DetailsType, Communication>('communication');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to natural personality.
 * @deprecated Use the `Accessors.genius` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const genius =
  createAccessor<PersonalityType, Genius, PersonalityDetailType>('genius');

/**
 * Get the resources of the descriptions heading.
 * @param type The genius type or birthday.
 * @deprecated Use the `Accessors.getDescription()` instance method
 * instead of this function. This will may no longer the next update.
 */
export const getDescriptionAsync = (
  type?: string
): Promise<DesctiptionsType | undefined> =>
  getAsync<DesctiptionsType>('descriptions', { type });

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to the base of ego type.
 * @deprecated Use the `Accessors.lifeBase` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const lifeBase: ResourcesAccessor<string, LifeBase, string> = {
  getAsync: async (key) => (await getResourcesAsync())(`lifeBase.${key}`),
  getCategoryDetailAsync: async () =>
    (await getResourcesAsync())('lifeBase.detail'),
};

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to risk and return thinking in specific people.
 * @deprecated Use the `Accessors.management` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const management = createAccessor<DetailsType, Management>('management');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to an environment that is easy to get motivated.
 * @deprecated Use the `Accessors.motivation` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const motivation: ResourcesAccessor<string, Motivation, string> = {
  getAsync: async (key) => (await getResourcesAsync())(`motivation.${key}`),
  getCategoryDetailAsync: async () =>
    (await getResourcesAsync())('motivation.detail'),
};

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to a talented role.
 * @deprecated Use the `Accessors.position` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const position = createAccessor<DetailsType, Position>('position');

/**
 * The instance provides a set of functions that retrieve
 * human-readable resources related to on-site or behind.
 * @deprecated Use the `Accessors.response` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const response = createAccessor<DetailsType, Response>('response');

/**
 * The instance provides a set of functions that retrieve human-readable
 * resources related to the major classification of personality.
 * @deprecated Use the `Accessors.vector` instance property instead of
 * this constant. This will may no longer the next update.
 */
export const vector = createAccessor<VectorType, Vector>('vector');
