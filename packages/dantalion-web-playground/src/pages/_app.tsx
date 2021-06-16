import type { AppProps } from 'next/app';
import type { VFC } from 'react';
import 'tailwindcss/tailwind.css';
import useChangeLanguage from '../hooks/useChangeLanguage';
import '../i18n';

/** The app root component */
const App: VFC<AppProps> = ({ Component, pageProps, router }) => {
  useChangeLanguage(router.query.lang);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};
App.displayName = 'App';

export default App;
