import type { Resource } from 'i18next';

const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

type ResourceObject = Record<string, unknown>;

const isResourceObject = (value: unknown): value is ResourceObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const cloneResourceValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(cloneResourceValue);
  }
  if (isResourceObject(value)) {
    return mergeResourceObjects(value);
  }
  return value;
};

const mergeResourceObjects = (
  ...sources: readonly ResourceObject[]
): ResourceObject => {
  const result: ResourceObject = {};
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      if (unsafeKeys.has(key)) {
        continue;
      }
      const value = source[key];
      const existing = result[key];
      if (value === undefined && existing !== undefined) {
        continue;
      }
      result[key] =
        isResourceObject(existing) && isResourceObject(value)
          ? mergeResourceObjects(existing, value)
          : cloneResourceValue(value);
    }
  }
  return result;
};

/**
 * Merge built-in and caller-provided resources without mutating either input.
 * Arrays from later sources replace earlier arrays instead of merging by index.
 */
export const mergeResources = (
  base: Resource,
  additions?: Resource,
): Resource =>
  mergeResourceObjects(
    base as ResourceObject,
    (additions ?? {}) as ResourceObject,
  ) as Resource;
