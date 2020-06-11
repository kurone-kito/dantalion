import i18next from 'i18next';
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
 * Get the i18n function.
 * @param language The language.
 *
 * If omitted, the language used is detected from the current environment.
 */
export default (language?: string) =>
  i18next.init({
    lng: language ?? getLocale(),
    debug: false,
    resources: { en: wrap(en), ja: wrap(ja) },
  });
