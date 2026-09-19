import { line } from './list.js';

const MAX_HEADING_LEVEL = 6;

/** The options for the `article` function. */
export interface Options {
  /** The body text. */
  readonly body?: string | undefined;
  /** The heading text. */
  readonly head: string;
  /**
   * The heading level.
   *
   * Positive safe integers up to level 6 are used as-is. Zero, negative,
   * fractional, non-finite, excessive, and other invalid values use level 1.
   */
  readonly level?: number | undefined;
}

const normalizeLevel = (level: number): number =>
  Number.isSafeInteger(level) && level > 0 && level <= MAX_HEADING_LEVEL
    ? level
    : 1;

/**
 * Create the Markdown from the heading and body pair.
 * @param options The options.
 */
export default ({ body = '', head, level = 1 }: Options): string =>
  line(`${'#'.repeat(normalizeLevel(level))} ${head}`.trim(), '', body.trim());
