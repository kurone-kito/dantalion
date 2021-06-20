import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Template from '../components/templates/Template';
import type { PageProps } from './_app';

/** The index page component */
const Component: NextPage<PageProps> = () =>
  useRouter().isFallback ? <>Loading...</> : <Template />;
Component.displayName = 'Index';

export default Component;
