import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useIsSsr from './useIsSsr';

/** Type definition of the arguments for the routing function. */
export interface RouteProps {
  /** If you need the change language, specify them. */
  readonly lang?: string;
  /** If you need the change result, specify them. */
  readonly result?: string;
}

/** Type definition of the routing function. */
export type Route = (props?: RouteProps) => Promise<boolean>;

/** The query elements list to ignore. */
const excludes = Object.freeze(['genius', 'lang']);

/** Detect the language from the query. */
export const useLanguage = (): string | undefined => {
  const { query } = useRouter();
  return typeof query.lang === 'string' ? query.lang : undefined;
};

/** Detect the personality result from the query. */
export const useResultQuery = (): string | undefined => {
  const isSsr = useIsSsr();
  const { query } = useRouter();
  return isSsr(true)
    ? Object.keys(query).find((q) => !excludes.includes(q))
    : undefined;
};

/** Create the route function. */
export const useRoute = (): Route => {
  const defaultLang = useLanguage();
  const defaultResult = useResultQuery();
  const router = useRouter();
  return useCallback<Route>(
    ({ result = defaultResult, lang = defaultLang } = {}) =>
      router.push(
        {
          query: {
            ...(lang ? { lang } : undefined),
            ...(result ? { [result]: '' } : undefined),
          },
          pathname: lang ? '/[lang]' : `/`,
        },
        undefined,
        { scroll: true, shallow: true }
      ),
    [defaultLang, defaultResult, router]
  );
};
