import { line } from './list.js';

/** The options for the `article` function. */
export interface Options {
  /** The body text. */
  readonly body?: string | undefined;
  /** The heading text. */
  readonly head: string;
  /**
   * The heading level.
   *
   * This argument can use only natural numbers.
   */
  readonly level?: number | undefined;
}

/**
 * Create the Markdown from the heading and body pair.
 * @param options The options.
 */
export default ({ body = '', head, level = 1 }: Options): string =>
  line(`${'#'.repeat(level)} ${head}`.trim(), '', body.trim());
