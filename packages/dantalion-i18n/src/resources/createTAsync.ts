import type {
  InitOptions,
  Module,
  Newable,
  Resource,
  TFunction,
  ThirdPartyModule,
} from 'i18next';
import i18next from 'i18next';
import getLocale from '../getLocale.js';
import enDocument from './en.json' with { type: 'json' };
import jaDocument from './ja.json' with { type: 'json' };
import { mergeResources } from './mergeResources.js';
import type { LocaleDocumentType } from './types.js';

/** The language that uses as a fallback. */
export const fallbackLng = 'en';

const localeDocuments = {
  en: enDocument,
  ja: jaDocument,
} satisfies Record<'en' | 'ja', LocaleDocumentType>;

const { en, ja } = localeDocuments;

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

/** A translation function annotated with the initialized locale. */
export type LocalizedTFunction = TFunction & {
  readonly locale: string;
};

/**
 * Create the resources object.
 * @param addition The additional language and namespace resources.
 */
const initResources = (addition?: Resource): Resource =>
  mergeResources(
    { en: { translation: en }, ja: { translation: ja } },
    addition,
  );

/** Create and initialize the i18next instance asynchronously. */
export default async (
  options: CreateTAsyncOptions = {},
): Promise<LocalizedTFunction> => {
  const { additions, lng = getLocale(), use } = options;
  const instance = i18next.createInstance();
  const init: InitOptions = {
    fallbackLng,
    interpolation: { escapeValue: false },
    lng,
    resources: initResources(additions),
  };
  const modules = use ? (Array.isArray(use) ? use : [use]) : [];
  for (const module of modules) {
    instance.use(module);
  }
  const t = await instance.init(init);
  Object.defineProperty(t, 'locale', {
    configurable: false,
    enumerable: false,
    value: instance.language,
    writable: false,
  });
  return t as LocalizedTFunction;
};
