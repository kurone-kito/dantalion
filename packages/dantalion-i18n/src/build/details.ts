import type { DetailsBaseType, DetailsType } from '../resources/types';
import article from './article';
import { line, list } from './list';

/**
 * The options for the `detailsBase` and `detailsMore` function.
 * @template S The type of source object.
 */
export interface Options<S extends DetailsBaseType = DetailsBaseType> {
  /** The additional strings. */
  readonly addition?: string;
  /** The source. */
  readonly src: S;
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
  addition = '',
  level = 2,
  src,
}: Options): string =>
  article({ body: `${src.detail} ${addition}`, head: src.name, level });

/**
 * Create the Markdown from the DetailsType object.
 * @param source The name, detail and more descriptions.
 */
export const detailsMore = ({
  level = 3,
  src,
  ...rest
}: Options<DetailsType>): string =>
  line(detailsBase({ level, src, ...rest }), list(...src.more));
