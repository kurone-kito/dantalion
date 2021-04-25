import getResourcesAsync from './t';
import type { DetailsBaseType } from './types';

/**
 * The type definition with a function to access
 * a resource of the specific category.
 * @template T The type of resource as a return value.
 * @template K The type for the key.
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
 * @template T The type of resource as a return value.
 * @param key The key.
 * @returns The resources object.
 *
 * If the resource associated with the specified key does not exist,
 * the function returns an undefined value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const getAsync = async <T extends object>(key: string) => {
  const t = await getResourcesAsync();
  const result = t<string | T>(key, { returnObjects: true });
  return typeof result === 'string' ? undefined : result;
};

/**
 * Create the accessor functions that acquire the resource corresponding
 * to the specified category asynchronously.
 * @template T The type of resource as a return value.
 * @template K The type for the key.
 * @param category The category key.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default <T extends object, K extends string>(
  category: string
): ResourcesAccessor<T, K> => ({
  getCategoryDetailAsync: () => getAsync<DetailsBaseType>(`${category}.detail`),
  getAsync: (key: K) => getAsync<T>(`${category}.${key}`),
});
