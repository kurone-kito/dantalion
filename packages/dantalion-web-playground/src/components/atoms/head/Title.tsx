import Head from 'next/head';
import type { VFC } from 'react';
import createTitle, { Options } from '../../../utils/createTitle';

/** Type definition of the required attributes. */
export type Props = Options;

/** The page title component. */
const Component: VFC<Props> = (props) => (
  <Head>
    <title>{createTitle(props)}</title>
  </Head>
);
Component.displayName = 'Title';

export default Component;
