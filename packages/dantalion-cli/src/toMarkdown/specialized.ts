import type { LifeBase, Motivation } from '@kurone-kito/dantalion-core';
import {
  VectorType,
  getDescriptionAsync,
  lifeBase,
  motivation,
} from '@kurone-kito/dantalion-i18n';
import article from './article';
import { line, list } from './list';

export const fromLifeBaseAsync = async (source?: LifeBase): Promise<string> =>
  source
    ? article({
        body: await lifeBase.getAsync(source),
        head: await lifeBase.getCategoryDetailAsync(),
        level: 2,
      })
    : '';

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
