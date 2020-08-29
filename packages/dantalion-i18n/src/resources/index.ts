import i18next, { TFunction } from 'i18next';
import getLocale from '../getLocale';
import en from './en.json';
import ja from './ja.json';

/** Type definition for resources. */
interface ResourceType {
  hello: string;
}

/**
 * Build JSON for resources.
 * @param translation resources data.
 */
const wrap = (translation: ResourceType) => ({ translation });

/**
 * Create the i18n function.
 * @param language The language.
 *
 * If omitted, the language used is detected from the current environment.
 */
const createInstance = (language?: string) =>
  i18next.init({
    fallbackLng: 'ja',
    lng: language ?? getLocale(),
    debug: false,
    resources: { en: wrap(en), ja: wrap(ja) },
  });

/** Cached i18n function. */
let t: TFunction;
/** Get the cached i18n function. */
export default async () => {
  if (!t) {
    t = await createInstance();
  }
  return t;
};
