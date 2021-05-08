import type { Personality } from '@kurone-kito/dantalion-core';
import {
  PersonalityType,
  genius,
  getDescriptionAsync,
} from '@kurone-kito/dantalion-i18n';
import article, { Options } from './article';
import { detailsBase } from './details';
import { line, list, order } from './list';

export const fromGeniusOnlySummary = (
  source?: Pick<PersonalityType, 'detail' | 'name' | 'summary'>,
  level?: number
): string =>
  source
    ? line(
        article({ body: source.summary, head: source.name, level }),
        list(...source.detail)
      )
    : '';

export const fromGeniusOnlyDesctiptionAsync = async (
  source?: Pick<PersonalityType, 'keyword' | 'strategy' | 'weak'>,
  level?: number
): Promise<string> => {
  const descriptions = await getDescriptionAsync();
  return source
    ? line(
        ...(<Options[]>[
          { head: descriptions?.strategy, body: list(...source.strategy) },
          { head: descriptions?.weak, body: list(...source.weak) },
          { head: descriptions?.keyword, body: list(...source.keyword) },
        ]).map((options) => article({ ...options, level }))
      )
    : '';
};

export const fromGeniusAsync = async (
  source?: PersonalityType,
  level?: number
): Promise<string> =>
  source
    ? line(
        fromGeniusOnlySummary(source, level),
        await fromGeniusOnlyDesctiptionAsync(source, (level ?? 1) + 1)
      )
    : '';

export const fromGeniusForPersonalityAsync = async ({
  inner,
  outer,
  workStyle,
}: Pick<Personality, 'inner' | 'outer' | 'workStyle'>): Promise<string> => {
  const descriptions = await getDescriptionAsync();
  const psDetails = await genius.getCategoryDetailAsync();
  return line(
    detailsBase({ additional: descriptions?.genius1, source: psDetails }),
    order(psDetails?.inner, psDetails?.outer, psDetails?.workStyle),
    descriptions?.genius2,
    ...(await Promise.all(
      ([
        [fromGeniusAsync, inner, psDetails?.inner],
        [fromGeniusOnlySummary, outer, psDetails?.outer],
        [fromGeniusOnlySummary, workStyle, psDetails?.workStyle],
      ] as const).map(async ([fn, type, head]) =>
        article({
          body: await fn(await genius.getAsync(type), 4),
          head,
          level: 3,
        })
      )
    ))
  );
};
