import { marked } from 'marked';
// @ts-expect-error — marked-terminal v7 ships no types and no
// @types/marked-terminal exists for v7; the runtime export is a
// `markedTerminal()` plugin factory returning a marked extension.
import { markedTerminal } from 'marked-terminal';

marked.use(markedTerminal());

/**
 * Render the markdown document for terminal.
 * @param source The markdown document.
 */
export default (source: string): void => {
  // biome-ignore lint/suspicious/noConsole: this CLI's stdout contract
  console.info(marked.parse(source));
};
