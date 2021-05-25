import type { AppProps } from 'next/app';
import type { VFC } from 'react';
import 'tailwindcss/tailwind.css';
import '../i18n';

const App: VFC<AppProps> = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);
App.displayName = 'App';

export default App;
