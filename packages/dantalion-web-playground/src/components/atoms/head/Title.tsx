import Head from 'next/head';
import type { VFC } from 'react';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the web app name. */
  readonly appName?: string;
  /** Specifies the page name. */
  readonly pageName?: string;
}

/** The page title component. */
const Component: VFC<Props> = ({ appName, pageName }) => (
  <Head>
    <title>{(pageName ? [pageName, appName] : [appName]).join('::')}</title>
  </Head>
);
Component.displayName = 'Title';

export default Component;
