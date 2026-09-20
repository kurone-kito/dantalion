import { describe, expect, it } from 'vitest';
import en from './en.json' with { type: 'json' };
import ja from './ja.json' with { type: 'json' };
import type { LocaleDocumentType } from './types.js';

interface LeafEntry {
  readonly path: string;
  readonly value: string;
}

const flattenLeaves = (value: unknown, path = ''): LeafEntry[] => {
  if (typeof value === 'string') {
    return [{ path, value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((child, index) =>
      flattenLeaves(child, `${path}.${index}`),
    );
  }

  if (value === null || typeof value !== 'object') {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flattenLeaves(child, path ? `${path}.${key}` : key),
  );
};

const extractTranslationReferences = (value: string): string[] =>
  [...value.matchAll(/\$t\(([^)]+)\)/g)].map((match) => match[1] ?? '');

const extractInterpolationReferences = (value: string): string[] =>
  [...value.matchAll(/\{\{([^}]+)\}\}/g)].map((match) => match[1] ?? '');

const extractReferences = (value: string): string[] =>
  [...value.matchAll(/\$t\(([^)]+)\)|\{\{([^}]+)\}\}/g)].map(
    (match) => match[1] ?? match[2] ?? '',
  );

const interpolationReferencesByPath = (value: unknown): Map<string, string[]> =>
  new Map(
    flattenLeaves(value).map(({ path, value: leaf }) => [
      path,
      extractInterpolationReferences(leaf).sort(),
    ]),
  );

const translationReferencesByPath = (value: unknown): Map<string, string[]> =>
  new Map(
    flattenLeaves(value).map(({ path, value: leaf }) => [
      path,
      extractTranslationReferences(leaf).sort(),
    ]),
  );

const resourcePaths = (value: unknown): Set<string> =>
  new Set(flattenLeaves(value).map(({ path }) => path));

const sortedLeafPaths = (value: unknown): string[] =>
  flattenLeaves(value)
    .map(({ path }) => path)
    .sort();

const potentialMembers = Object.keys(en.potentials)
  .filter((key) => key !== 'detail')
  .sort();

const potentialPairValue = (
  locale: typeof en,
  first: string,
  second: string,
): unknown => {
  const firstEntry = (locale.potentials as Record<string, unknown>)[first];
  if (firstEntry === null || typeof firstEntry !== 'object') {
    return undefined;
  }

  return (firstEntry as Record<string, unknown>)[second];
};

type OrphanKeys<Actual, Expected> = Actual extends readonly unknown[]
  ? never
  : Actual extends object
    ? Expected extends object
      ?
          | Exclude<keyof Actual, keyof Expected>
          | {
              [Key in keyof Actual & keyof Expected]: OrphanKeys<
                Actual[Key],
                Expected[Key]
              >;
            }[keyof Actual & keyof Expected]
      : never
    : never;

const assertNoOrphanKeys = <_T extends never>(): void => {};

assertNoOrphanKeys<OrphanKeys<typeof en, LocaleDocumentType>>();
assertNoOrphanKeys<OrphanKeys<typeof ja, LocaleDocumentType>>();

describe('locale document types', () => {
  it('loads both locale documents for compile-time checks', () => {
    expect(en).toBeDefined();
    expect(ja).toBeDefined();
  });

  it('keeps diagonal potential aliases array-resolving', () => {
    expect(en.potentials.Ci.Ci).toBe('$t(potentials.Ci.detail)');
    expect(en.potentials.Fi.Fi).toBe('$t(potentials.Fi.detail)');
    expect(en.potentials.Ii.Ii).toBe('$t(potentials.Ii.detail)');
    expect(en.potentials.Io.Io).toBe('$t(potentials.Io.detail)');
    expect(ja.potentials.Ci.Ci).toBe('$t(potentials.Ci.detail)');
    expect(ja.potentials.Fi.Fi).toBe('$t(potentials.Fi.detail)');
    expect(ja.potentials.Ii.Ii).toBe('$t(potentials.Ii.detail)');
    expect(ja.potentials.Io.Io).toBe('$t(potentials.Io.detail)');
  });
});

describe('locale document parity', () => {
  it('keeps every flattened resource path in sync', () => {
    expect(sortedLeafPaths(en)).toStrictEqual(sortedLeafPaths(ja));
  });

  it('keeps interpolation targets in sync and translation targets resolvable', () => {
    const english = interpolationReferencesByPath(en);
    const japanese = interpolationReferencesByPath(ja);

    expect([...english.keys()].sort()).toStrictEqual(
      [...japanese.keys()].sort(),
    );
    for (const path of english.keys()) {
      expect(english.get(path)).toStrictEqual(japanese.get(path));
    }

    for (const locale of [en, ja]) {
      const paths = resourcePaths(locale);
      for (const { path, value } of flattenLeaves(locale)) {
        for (const reference of extractTranslationReferences(value)) {
          const resolves =
            paths.has(reference) ||
            [...paths].some((target) => target.startsWith(`${reference}.`));
          expect(resolves, `${path} -> ${reference}`).toBe(true);
        }
      }
    }
  });

  it('keeps genius.100 strategy aliases in sync', () => {
    const english = translationReferencesByPath(en);
    const japanese = translationReferencesByPath(ja);

    for (const path of ['genius.100.strategy.1', 'genius.100.strategy.2']) {
      expect(english.get(path), path).toStrictEqual(japanese.get(path));
    }
  });

  it.each([
    en,
    ja,
  ])('keeps potential pair references within the pair', (locale) => {
    const pairCount = potentialMembers.reduce(
      (count, _, index) => count + potentialMembers.length - index,
      0,
    );
    expect(pairCount).toBe(55);

    potentialMembers.forEach((first, firstIndex) => {
      potentialMembers.slice(firstIndex).forEach((second) => {
        const members = new Set([first, second]);
        const pairValue = potentialPairValue(locale, first, second);
        expect(pairValue, `${first}.${second}`).toBeDefined();
        const references = flattenLeaves(pairValue).flatMap(({ value }) =>
          extractReferences(value),
        );
        const unexpected = references.filter((reference) => {
          const [namespace, member] = reference.split('.');
          return (
            namespace === 'potentials' &&
            typeof member === 'string' &&
            !members.has(member)
          );
        });

        expect(unexpected, `${first}.${second}`).toStrictEqual([]);
      });
    });
  });
});
