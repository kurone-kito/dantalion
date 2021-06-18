import { locales } from '@kurone-kito/dantalion-i18n';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Template from '../components/templates/Template';

/** Type definition of the required attributes. */
export type Query = { readonly lang: string };

/** Type definition of the required attributes. */
export interface Props {
  readonly lang?: string;
}

/** The index page component */
const Component: NextPage<Props> = () =>
  useRouter().isFallback ? <>Loading...</> : <Template />;
Component.displayName = '[lang]';

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
}) => ({ props: { lang: params?.lang } });

export const getStaticPaths: GetStaticPaths<Query> = async () => ({
  fallback: false,
  paths: Object.keys(locales).map((lang) => ({ params: { lang } })),
});

export default Component;
