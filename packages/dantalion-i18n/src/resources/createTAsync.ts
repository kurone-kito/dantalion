import i18next, {
  InitOptions,
  Module,
  Newable,
  Resource,
  ResourceLanguage,
  TFunction,
  ThirdPartyModule,
} from 'i18next';
import merge from 'lodash.merge';
import getLocale from '../getLocale';
import en from './en.json';
import ja from './ja.json';

/** The language that uses as a fallback. */
export const fallbackLng = 'en';

/** The type definition that the options of the createTAsync function. */
export interface CreateTAsyncOptions extends Pick<InitOptions, 'lng'> {
  /** Specify the additional resources if you need */
  readonly additions?: ResourceLanguage;
  /** The use function is there to load additional plugins to i18next. */
  readonly use?:
    | Module
    | Newable<Module>
    | ThirdPartyModule[]
    | Newable<ThirdPartyModule>[];
}

/**
 * The function type definition that creates and initializes the
 * i18next instance asynchronously.
 */
export interface CreateTAsync {
  /**
   * Create and initialize the i18next instance asynchronously.
   * @param options The options
   * @returns The function of the i18next
   */
  (options: CreateTAsyncOptions): Promise<TFunction>;
  /**
   * Create and initialize the i18next instance asynchronously.
   * @deprecated This method of argument is deprecated. Use a single option.
   * @param lng The language to use
   *
   * If omitted, the language used is detected from the current environment.
   * @param addition Specify the additional resources if you need
   * @returns The function of the i18next
   * @see useLocale()
   */
  (lng?: string, addition?: ResourceLanguage): Promise<TFunction>;
}

/**
 * Create the resources object.
 * @param addition The additional resources.
 */
const initResources = (addition?: ResourceLanguage): Resource =>
  Object.entries(merge(addition, { en, ja })).reduce<Resource>(
    (acc, [k, v]) => ({ ...acc, [k]: { translation: v } }),
    {}
  );

/** Create and initialize the i18next instance asynchronously. */
const createTAsync: CreateTAsync = (
  options?: string | CreateTAsyncOptions,
  addition?: ResourceLanguage
) => {
  if (typeof options === 'object') {
    const { additions, lng = getLocale(), use } = options;
    const init: InitOptions = { lng, resources: initResources(additions) };
    return use ? i18next.use(use).init(init) : i18next.init(init);
  }
  return i18next.init({
    fallbackLng,
    lng: options ?? getLocale(),
    resources: initResources(addition),
  });
};

export default createTAsync;
