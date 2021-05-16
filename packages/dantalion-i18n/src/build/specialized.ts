import type { LifeBase, Motivation } from '@kurone-kito/dantalion-core';
import {
  getDescriptionAsync,
  lifeBase,
  motivation,
} from '../resources/accessors';
import type { VectorType } from '../resources/types';
import article from './article';
import { line, list } from './list';

/**
 * Create the Markdown from the LifeBase resources.
 * @param source The source.
 */
export const fromLifeBaseAsync = async (source?: LifeBase): Promise<string> =>
  source
    ? article({
        body: await lifeBase.getAsync(source),
        head: await lifeBase.getCategoryDetailAsync(),
        level: 2,
      })
    : '';

/**
 * Create the Markdown from the Motivation resources.
 * @param source The source.
 */
export const fromMotivationAsync = async (
  source?: Motivation
): Promise<string> =>
  source
    ? article({
        body: await motivation.getAsync(source),
        head: await motivation.getCategoryDetailAsync(),
        level: 2,
      })
    : '';

/**
 * Create the Markdown from the vector resources.
 * @param source The source.
 */
export const fromVectorAsync = async (source?: VectorType): Promise<string> =>
  source
    ? line(
        article({ head: source.name, body: list(...source.detail), level: 3 }),
        article({
          head: (await getDescriptionAsync())?.strategy,
          body: list(...source.strategy),
          level: 4,
        })
      )
    : '';
