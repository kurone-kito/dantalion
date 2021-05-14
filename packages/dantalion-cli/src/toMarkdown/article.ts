import { line } from './list';

/** The options for the `article` function. */
export interface Options {
  /**
   * The body text.
   *
   * If this value is an array, it will be rendered multiple lines,
   * one element at a line.
   */
  readonly body?: string | readonly (string | undefined)[];
  /** The heading text. */
  readonly head?: string;
  /**
   * The heading level.
   *
   * This argument can use only natural numbers.
   */
  readonly level?: number;
}

/**
 * Create the Markdown from the heading and body pair.
 * @param options The options.
 */
export default ({ body = '', head = '', level = 1 }: Options = {}): string =>
  line(
    `${'#'.repeat(level)} ${head}`.trim(),
    '',
    (typeof body === 'string' ? body : line(...body)).trim()
  );
