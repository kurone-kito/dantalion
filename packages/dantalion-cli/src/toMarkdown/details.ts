import type { DetailsBaseType, DetailsType } from '@kurone-kito/dantalion-i18n';
import article from './article';
import { line, list } from './list';

/**
 * The options for the `detailsBase` and `detailsMore` function.
 * @template S The type of source object.
 */
export interface Options<S extends DetailsBaseType> {
  /** The additional strings. */
  readonly additional?: string;
  /** The source. */
  readonly source?: S;
  /**
   * The heading level.
   *
   * This argument can use only natural numbers.
   */
  readonly level?: number;
}

/**
 * Create the Markdown from the DetailsBaseType object.
 * @param source The pair of name and detail.
 * @param level The heading level.
 *
 * If omitted, its default value is `2`.
 */
export const detailsBase = ({
  additional = '',
  level = 2,
  source,
}: Options<DetailsBaseType>): string =>
  source
    ? article({
        body: `${source.detail}${additional}`,
        head: source.name,
        level,
      })
    : '';

/**
 * Create the Markdown from the DetailsType object.
 * @param source The name, detail and more descriptions.
 */
export const detailsMore = ({
  level = 3,
  source,
  ...options
}: Options<DetailsType>): string =>
  source
    ? line(detailsBase({ level, source, ...options }), list(...source.more))
    : '';
