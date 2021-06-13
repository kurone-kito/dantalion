import type { LifeBase, Motivation } from '@kurone-kito/dantalion-core';
import type { DetailAccessor } from '../resources/createGenericAccessor';
import type { DetailsBaseType, VectorType } from '../resources/types';
import article from './article';
import { line, list } from './list';

/**
 * Create the Markdown from the LifeBase resources.
 * @param resource The resource of tne LifeBase.
 * @param source The source.
 */
export const fromLifeBase = (
  {
    getByKey,
    getCategoryDetail,
  }: DetailAccessor<DetailsBaseType<string[]>, LifeBase, string>,
  source: LifeBase
): string => {
  const { detail, name } = getByKey(source);
  return line(
    article({ body: name, head: getCategoryDetail(), level: 2 }),
    '',
    list(...detail)
  );
};
/**
 * Create the Markdown from the Motivation resources.
 * @param resource The resource of tne motivation.
 * @param source The source.
 */
export const fromMotivation = (
  { getByKey, getCategoryDetail }: DetailAccessor<string, Motivation, string>,
  source: Motivation
): string =>
  article({ body: getByKey(source), head: getCategoryDetail(), level: 2 });

/**
 * Create the Markdown from the vector resources.
 * @param description The resource of tne description.
 * @param source The source.
 */
export const fromVector = (description: string, source: VectorType): string =>
  line(
    article({ head: source.name, body: list(...source.detail), level: 3 }),
    article({ head: description, body: list(...source.strategy), level: 4 })
  );
