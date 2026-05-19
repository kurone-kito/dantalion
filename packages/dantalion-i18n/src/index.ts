export { getDetailMarkdown, getPersonalityMarkdown } from './build/index.js';
export { default as getLocale } from './getLocale.js';
export type { Accessors } from './resources/createAccessorsAsync.js';
export {
  createAccessors,
  default as createAccessorsAsync,
} from './resources/createAccessorsAsync.js';
export type { DetailAccessor } from './resources/createGenericAccessor.js';
export type { CreateTAsyncOptions } from './resources/createTAsync.js';
export {
  default as createTAsync,
  fallbackLng as fallbackLanguage,
  locales,
} from './resources/createTAsync.js';
export type {
  DescriptionsType,
  DetailsBaseType,
  DetailsType,
  PersonalityDetailBaseType,
  PersonalityDetailType,
  PersonalityType,
  VectorType,
} from './resources/types.js';
