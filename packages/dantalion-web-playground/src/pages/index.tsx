import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Template from '../components/templates/Template';

/** The index page component */
const Component: NextPage = () =>
  useRouter().isFallback ? <>Loading...</> : <Template />;
Component.displayName = 'Index';

export default Component;
