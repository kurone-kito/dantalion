import type { StringMap } from 'i18next';
import createGenericAccessor from './createGenericAccessor';
import getResourcesAsync from './getTAsync';
import type { DetailsBaseType } from './types';

/**
 * The type definition with a function to access
 * a resource of the specific category.
 * @deprecated Use the `DetailAccessor<T, K, D>` type definition
 * instead of this type definition. This will may no longer the next update.
 * @template T The type of resource as a return value.
 * @template K The type for the key.
 * @template D The type of resource as a return value of category detail.
 */
export interface ResourcesAccessor<
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends object | string,
  K extends string,
  D extends DetailsBaseType | string = DetailsBaseType
> {
  /**
   * The function acquires the resource corresponding to the key asynchronously.
   */
  readonly getAsync: (
    /** The key. */
    key: K
  ) => Promise<T | undefined>;
  /**
   * The function acquires the resource corresponding
   * to the specific category asynchronously.
   */
  readonly getCategoryDetailAsync: () => Promise<D | undefined>;
}

/**
 * The function acquires the resource corresponding to the key asynchronously.
 * @deprecated Use the `Accessor.tObj()` method instead of this function.
 * This will may no longer the next update.
 * @template T The type of resource as a return value.
 * @param key The key.
 * @param placeholder The placeholder for i18next.
 * @returns The resources object.
 *
 * If the resource associated with the specified key does not exist,
 * the function returns an undefined value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getAsync = async <T extends object>(
  key: string,
  placeholder?: StringMap
): Promise<T | undefined> =>
  createGenericAccessor(await getResourcesAsync()).tObj<T>(key, placeholder);

/**
 * Create the accessor functions that acquire the resource corresponding
 * to the specified category asynchronously.
 * @deprecated Use the `Accessor.tDetail<T, K, D>()` method
 * instead of this function. This will may no longer the next update.
 * @template T The type of resource as a return value.
 * @template K The type for the key.
 * @template D The type of resource as a return value of category detail.
 * @param category The category key.
 */
export default <
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends object,
  K extends string,
  D extends DetailsBaseType = DetailsBaseType
>(
  category: string
): ResourcesAccessor<T, K, D> => ({
  getCategoryDetailAsync: () => getAsync<D>(`${category}.detail`),
  getAsync: (key: K) => getAsync<T>(`${category}.${key}`),
});
