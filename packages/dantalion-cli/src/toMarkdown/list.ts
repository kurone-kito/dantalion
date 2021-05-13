/**
 * Create the Markdown from the array string.
 * @param prefix The prefix string of each line.
 *
 * If omitted, its default value is empty string.
 */
export const createListFunc =
  (prefix = '') =>
  (
    /** The strings. */
    ...source: readonly (string | undefined)[]
  ): string =>
    `${source
      .reduce<string>(
        (acc, cur) => `${acc}
${prefix}${cur}`,
        ''
      )
      .trim()}
`;

/** Create the multiline from the array string. */
export const line = createListFunc();

/** Create the Markdown from the array string. */
export const list = createListFunc('- ');

/** Create the Markdown from the array string. */
export const order = createListFunc('1. ');

/**
 * Create the Markdown from the array string.
 * @param source The array string.
 * @param prefix The prefix string of each line.
 *
 * If omitted, its default value is "`- `".
 */
export default (source: readonly string[] = [], prefix = '- '): string =>
  createListFunc(prefix)(...source);
