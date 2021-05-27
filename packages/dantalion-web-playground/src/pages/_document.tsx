import Document, { Head, Html, Main, NextScript } from 'next/document';

/** Theme color */
const color = '#E5E7EB';

/** Desctiption */
const desc = 'Calculates the personality from the birthday.';

/** Whether the current build is production mode */
const isProd = process.env.NODE_ENV === 'production';

/** Title */
const title = '🦁 Dantalion';

/** Absolute URL of production build */
const productUrl = `${process.env.productDomain}${process.env.productPath}`;

/** The document root component */
export default class MyDocument extends Document {
  /** Render the virtual DOM structure */
  render(): JSX.Element {
    return (
      <Html>
        <Head prefix="og: http://ogp.me/ns# website: http://ogp.me/ns/website#">
          <meta httpEquiv="cleartype" content="on" />
          <meta httpEquiv="x-ua-compatible" content="ie=Edge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content={color} />
          <meta name="apple-mobile-web-app-title" content={title} />
          <meta name="application-name" content={title} />
          <meta name="color-scheme" content="only light" />
          <meta name="description" content={desc} />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={color} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@kurone_kito" />
          <meta itemProp="name" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="og:site_name" content={title} />
          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta property="op:markup_version" content="v1.0" />
          <link rel="author" href="https://kit.black/" />
          <link rel="bookmark" href={isProd ? process.env.productPath : '/'} />
          <link rel="first" href={isProd ? process.env.productPath : '/'} />
          {isProd && <link rel="canonical" href={productUrl} />}
        </Head>
        <body className="antialiased bg-gray-200 text-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
