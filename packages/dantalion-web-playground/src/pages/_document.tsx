import Document, { Head, Html, Main, NextScript } from 'next/document';

/** The document root component */
export default class MyDocument extends Document {
  /** Render the virtual DOM structure */
  render(): JSX.Element {
    return (
      <Html prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# website: http://ogp.me/ns/website#">
        <Head />
        <body className="antialiased bg-gray-200 text-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
