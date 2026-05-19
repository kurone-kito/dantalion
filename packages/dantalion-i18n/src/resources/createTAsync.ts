import type {
  InitOptions,
  Module,
  Newable,
  Resource,
  ResourceLanguage,
  TFunction,
  ThirdPartyModule,
} from 'i18next';
import i18next from 'i18next';
import merge from 'lodash.merge';
import getLocale from '../getLocale.js';
import en from './en.json' with { type: 'json' };
import ja from './ja.json' with { type: 'json' };

/** The language that uses as a fallback. */
export const fallbackLng = 'en';

/**
 * The locales table.
 *
 * The property keys have ISO 639-1 string and values exact name.
 */
export const locales = Object.freeze({ en: en.name, ja: ja.name });

/** The type definition that the options of the createTAsync function. */
export interface CreateTAsyncOptions extends Pick<InitOptions, 'lng'> {
  /** The locale to use, e.g. `en` or `ja`. */
  readonly lng?: string | undefined;
  /** Specify the additional resources if you need */
  readonly additions?: ResourceLanguage | undefined;
  /** The use function is there to load additional plugins to i18next. */
  readonly use?:
    | Module
    | Newable<Module>
    | ThirdPartyModule[]
    | Newable<ThirdPartyModule>[]
    | undefined;
}

/**
 * Create the resources object.
 * @param addition The additional resources.
 */
const initResources = (addition?: ResourceLanguage): Resource =>
  Object.entries(merge(addition, { en, ja })).reduce<Resource>(
    (acc, [k, v]) => ({ ...acc, [k]: { translation: v } }),
    {},
  );

/** Create and initialize the i18next instance asynchronously. */
export default (options: CreateTAsyncOptions = {}): Promise<TFunction> => {
  const { additions, lng = getLocale(), use } = options;
  const init: InitOptions = { lng, resources: initResources(additions) };
  return use
    ? i18next.use(use as Module | Newable<Module>).init(init)
    : i18next.init(init);
};
