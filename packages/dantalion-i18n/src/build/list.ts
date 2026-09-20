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
  ): string => {
    const definedSource = source.filter(
      (value): value is string => value !== undefined,
    );
    if (definedSource.length === 0) return '';
    return `${definedSource
      .reduce<string>(
        (acc, cur) => `${acc}
${prefix}${cur}`,
        '',
      )
      .trim()}
`;
  };

/** Create the multiline from the array string. */
export const line = createListFunc();

/** Create the Markdown from the array string. */
export const list = createListFunc('- ');

/** Create the Markdown from the array string. */
export const order = createListFunc('1. ');
