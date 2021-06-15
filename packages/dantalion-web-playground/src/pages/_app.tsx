import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { VFC } from 'react';
import 'tailwindcss/tailwind.css';
import Title from '../components/atoms/head/Title';
import HeadContents from '../components/molecules/HeadContents';
import FormReducer from '../stores/FormReducer';
import '../i18n';

/** The web app name. */
const appName = 'Dantalion';

/** The current page name. */
const pageName = '';

/** The app root component */
const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Title appName={appName} pageName={pageName} />
    <Head>
      <HeadContents
        baseUrl={process.env.assetPrefix}
        author="Kurone Kito, @kurone_kito"
        appName={appName}
        article={false}
        bannerHeight={630}
        bannerPath="/favicons/ogp.png"
        bannerWidth={1200}
        color="#E5E7EB"
        description="Calculates the personality from the birthday."
        keywords={['Dantalion']}
        pageName={pageName}
      />
    </Head>
    <FormReducer.Provider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </FormReducer.Provider>
  </>
);
App.displayName = 'App';

export default App;
