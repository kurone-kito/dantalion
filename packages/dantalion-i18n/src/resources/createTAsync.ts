import i18next, { Resource, ResourceLanguage, TFunction } from 'i18next';
import merge from 'lodash.merge';
import getLocale from '../getLocale';
import en from './en.json';
import ja from './ja.json';

/** The language that uses as a fallback. */
export const fallbackLng = 'en';

/**
 * Create the resources object.
 * @param addition The additional resources.
 */
const initResources = (addition?: ResourceLanguage): Resource =>
  Object.entries(merge(addition, { en, ja })).reduce<Resource>(
    (acc, [k, v]) => ({ ...acc, [k]: { translation: v } }),
    {}
  );

/**
 * Create and initialize the i18next instance asynchronously.
 * @param lng The language to use
 *
 * If omitted, the language used is detected from the current environment.
 * @param addition Specify the additional resources if you need
 * @see useLocale()
 */
export default async (
  lng = getLocale(),
  addition?: ResourceLanguage
): Promise<TFunction> =>
  i18next.init({ fallbackLng, lng, resources: initResources(addition) });
