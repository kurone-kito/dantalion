import type {
  InitOptions,
  Module,
  Newable,
  Resource,
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

type I18nextModule =
  | Module
  | Newable<Module>
  | ThirdPartyModule
  | Newable<ThirdPartyModule>;

/** The type definition that the options of the createTAsync function. */
export interface CreateTAsyncOptions {
  /** The locale to use, e.g. `en` or `ja`. */
  readonly lng?: string | undefined;
  /** Specify the additional language and namespace resources if you need. */
  readonly additions?: Resource | undefined;
  /** The use function is there to load additional plugins to i18next. */
  readonly use?: I18nextModule | readonly I18nextModule[] | undefined;
}

/**
 * Create the resources object.
 * @param addition The additional language and namespace resources.
 */
const initResources = (addition?: Resource): Resource =>
  merge({}, { en: { translation: en }, ja: { translation: ja } }, addition);

/** Create and initialize the i18next instance asynchronously. */
export default (options: CreateTAsyncOptions = {}): Promise<TFunction> => {
  const { additions, lng = getLocale(), use } = options;
  const instance = i18next.createInstance();
  const init: InitOptions = { lng, resources: initResources(additions) };
  const modules = use ? (Array.isArray(use) ? use : [use]) : [];
  for (const module of modules) {
    instance.use(module);
  }
  return instance.init(init);
};
