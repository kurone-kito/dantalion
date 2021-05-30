import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { VFC } from 'react';
import 'tailwindcss/tailwind.css';
import FormReducer from '../stores/FormReducer';
import '../i18n';

/** The app root component */
const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Dantalion</title>
    </Head>
    <FormReducer.Provider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </FormReducer.Provider>
  </>
);
App.displayName = 'App';

export default App;
