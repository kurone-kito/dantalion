export { default as getLocale } from './getLocale';
export { getPersonalityMarkdownAsync, getDetailMarkdownAsync } from './build';
export {
  brain,
  communication,
  genius,
  getDescriptionAsync,
  lifeBase,
  management,
  motivation,
  position,
  response,
  vector,
} from './resources/accessors';
export type { ResourcesAccessor } from './resources/createAccessor';
export type { DetailAccessor } from './resources/createGenericAccessor';
export { default as createTAsync } from './resources/createTAsync';
export type {
  DesctiptionsType,
  DetailsBaseType,
  DetailsType,
  PersonalityDetailType,
  PersonalityType,
  VectorType,
} from './resources/types';
