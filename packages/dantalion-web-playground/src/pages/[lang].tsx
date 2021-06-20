import { locales } from '@kurone-kito/dantalion-i18n';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Template from '../components/templates/Template';
import type { PageProps } from './_app';

/** Type definition of the required attributes. */
export type Query = { readonly lang: string };

/** The index page component */
const Component: NextPage<PageProps> = () =>
  useRouter().isFallback ? <>Loading...</> : <Template />;
Component.displayName = '[lang]';

export const getStaticProps: GetStaticProps<PageProps, Query> = async ({
  params,
}) => ({ props: { lang: params?.lang } });

export const getStaticPaths: GetStaticPaths<Query> = async () => ({
  fallback: false,
  paths: Object.keys(locales).map((lang) => ({ params: { lang } })),
});

export default Component;
