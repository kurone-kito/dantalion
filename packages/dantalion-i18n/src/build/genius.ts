import type { Personality } from '@kurone-kito/dantalion-core';
import type { Accessors } from '../resources/createAccessorsAsync';
import type { DesctiptionsType, PersonalityType } from '../resources/types';
import article, { Options } from './article';
import { detailsBase } from './details';
import { line, list, order } from './list';

/**
 * Create the Markdown only summary from the Genius resources.
 * @param source The source.
 * @param level The heading level.
 */
const fromGeniusOnlySummary = (
  source: Pick<PersonalityType, 'detail' | 'name' | 'summary'>,
  level?: number
) =>
  line(
    article({ body: source.summary, head: source.name, level }),
    list(...source.detail)
  );

/**
 * Create the Markdown only descriptions from the Genius resources.
 * @param descriptions The resource of tne description.
 * @param source The source.
 * @param level The heading level.
 */
const fromGeniusOnlyDesctiption = (
  { strategy, weak }: Pick<DesctiptionsType, 'strategy' | 'weak'>,
  source: Pick<PersonalityType, 'strategy' | 'weak'>,
  level?: number
) =>
  line(
    ...(<Options[]>[
      { head: strategy, body: list(...source.strategy) },
      { head: weak, body: list(...source.weak) },
    ]).map((options) => article({ ...options, level }))
  );

/**
 * Create the Markdown from the Genius resources.
 * @param descriptions The resource of tne description.
 */
export const createFromGenius =
  (descriptions: Pick<DesctiptionsType, 'strategy' | 'weak'>) =>
  /**
   * @param source The source.
   * @param level The heading level.
   */
  (source: PersonalityType, level: number): string =>
    line(
      fromGeniusOnlySummary(source, level),
      fromGeniusOnlyDesctiption(descriptions, source, level + 1)
    );

/**
 * Create the Markdown from the Genius resources.
 * @param source The source.
 * @param accessors The accessors instance for resources.
 */
export const fromGeniusForPersonality = (
  source: Pick<Personality, 'inner' | 'outer' | 'workStyle'>,
  accessors: Accessors
): string => {
  const descriptions = accessors.getDescription();
  const { inner, outer, workStyle, ...details } =
    accessors.genius.getCategoryDetail();
  return line(
    detailsBase({ addition: descriptions.genius1, src: details }),
    order(inner, outer, workStyle),
    descriptions.genius2,
    ...(
      [
        [createFromGenius(descriptions), source.inner, inner],
        [fromGeniusOnlySummary, source.outer, outer],
        [fromGeniusOnlySummary, source.workStyle, workStyle],
      ] as const
    ).map(([fn, type, head]) =>
      article({ body: fn(accessors.genius.getByKey(type), 4), head, level: 3 })
    )
  );
};
