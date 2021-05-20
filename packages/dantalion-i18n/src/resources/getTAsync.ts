import type { TFunction } from 'i18next';
import createTAsync from './createTAsync';

/** Cached i18n function. */
let t: TFunction;

/**
 * Get the cached i18n function.
 * @deprecated Use the `createTAsync()` function instead of this function.
 * This will may no longer the next update.
 */
export default async (): Promise<TFunction> => {
  if (!t) {
    t = await createTAsync();
  }
  return t;
};
