import type { TFunction } from 'i18next';
import type { DetailsBaseType } from './types.js';

/**
 * Local alias for the placeholder argument type. i18next v22+
 * removed the public `StringMap` export; this matches the runtime
 * shape consumers pass into `t()`.
 */
type StringMap = Record<string, unknown>;

/**
 * Local alias for the generic constraint on accessor return types.
 * i18next renamed `TFunctionResult` to `TFunctionReturn` between
 * v20 and v23 and tightened its generic signature; this alias
 * keeps the package's public type parameters legible by matching
 * the runtime-possible union.
 */
type TFunctionResult = string | object | null | undefined;

/**
 * The type definition with a function to access
 * a resource of the specific category.
 * @template T The type of resource as a return value.
 * @template K The type for the resource key.
 * @template D The type of resource as a return value of category detail.
 */
export interface DetailAccessor<
  T extends TFunctionResult,
  K,
  D extends DetailsBaseType | string = DetailsBaseType,
> {
  /** The function acquires the resource corresponding to the key. */
  readonly getByKey: (
    /** The key. */
    key: K,
  ) => T;
  /**
   * The function acquires the resource corresponding to the specific category.
   */
  readonly getCategoryDetail: () => D;
}

/** The type definition of the resources accessors */
export interface Accessor {
  /** Get the resource as a detailed object */
  readonly tCategoryStringedDetail: <
    T extends TFunctionResult,
    K extends string = string,
  >(
    /** The key of category. */
    category: string,
  ) => DetailAccessor<T, K, string>;

  /** Get the resource as a detailed object */
  readonly tDetail: <
    T extends TFunctionResult,
    K extends string = string,
    D extends DetailsBaseType = DetailsBaseType,
  >(
    /** The key of category. */
    category: string,
  ) => DetailAccessor<T, K, D>;

  /** Get the resource as an object */
  readonly tObj: <T extends TFunctionResult>(
    key: string,
    placeholder?: StringMap,
  ) => T;

  /** Get the resource as a detailed object */
  readonly tStringedDetail: <K extends string = string>(
    /** The key of category. */
    category: string,
  ) => DetailAccessor<string, K, string>;
}

/**
 * Create an accessor that gets the resource as an object
 * @param t An i18next instance.
 */
const createTObj =
  (t: TFunction): Accessor['tObj'] =>
  /**
   * Get the resource as an object
   * @param key The key.
   * @param placeholder The placeholder for i18next.
   */
  (key: string, placeholder?: StringMap) =>
    // i18next v26's overloaded `t()` returns a union including
    // `$SpecialObject`; the caller's generic `<T>` narrows the type.
    t(key, { returnObjects: true, ...placeholder }) as never;

/**
 * Create the i18n function.
 * @param t An i18next instance.
 */
export default (t: TFunction): Accessor => {
  const tObj = createTObj(t);
  // Wrap the raw TFunction so its v26 overload signature matches
  // Accessor['tObj']'s simpler shape. The placeholder spread is
  // structurally identical to tObj's; the difference is the absence
  // of `returnObjects: true`, so t() returns the raw string.
  const tString: Accessor['tObj'] = (key, placeholder) =>
    t(key, placeholder as never) as never;
  const getDetail =
    (f: Accessor['tObj'], fc: Accessor['tObj'] = f) =>
    (category: string) => {
      const get =
        (func: Accessor['tObj']) =>
        <T extends TFunctionResult>(key?: string) =>
          func<T>([category, key ?? 'detail'].join('.'));
      return { getCategoryDetail: get(fc), getByKey: get(f) };
    };
  return {
    tCategoryStringedDetail: getDetail(tObj, tString),
    tDetail: getDetail(tObj),
    tObj,
    tStringedDetail: getDetail(tString),
  };
};
