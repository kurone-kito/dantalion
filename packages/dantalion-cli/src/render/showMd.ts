import marked from 'marked';
import TerminalRenderer from 'marked-terminal';

// marked-terminal's TerminalRenderer extends marked's Renderer; cast to
// satisfy the narrower v2 type definition that doesn't infer the relation.
marked.setOptions({
  // biome-ignore lint/suspicious/noExplicitAny: marked v2 typing limitation
  renderer: new TerminalRenderer() as any,
});

/**
 * Render the markdown document for terminal.
 * @param result The markdown document.
 */
// eslint-disable-next-line no-console
export default (source: string): void => console.info(marked(source));
