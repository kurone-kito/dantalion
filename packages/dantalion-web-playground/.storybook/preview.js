import '../src/styles/global.css';
import DocsContainer from './components/DocsContainer';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: { color: /(background|color)$/i, date: /Date$/ },
  },
  darkMode: { darkClass: 'dark', stylePreview: true },
  docs: { container: DocsContainer },
};
