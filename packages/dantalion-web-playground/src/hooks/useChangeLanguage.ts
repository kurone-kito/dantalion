import type { Router } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useIsSsr from './useIsSsr';

/**
 * It's the React custom hook which it changes language
 * by the i18next library.
 * @param lang Specifies the language,
 */
const useInternalChangeLaunguage = (lang: Router['query']['lang']) => {
  const { i18n } = useTranslation();
  const isSsr = useIsSsr();
  return useCallback(
    async (browser: boolean) =>
      isSsr(browser) &&
      !!lang &&
      typeof lang === 'string' &&
      i18n.changeLanguage(lang),
    [i18n, isSsr, lang]
  );
};

/**
 * It's the React custom hook which it changes language
 * by the i18next library.
 * @param lang Specifies the language,
 */
const useChangeLanguage = (lang: Router['query']['lang']): void => {
  const changeLanguage = useInternalChangeLaunguage(lang);
  changeLanguage(false);
  useEffect(() => {
    changeLanguage(true);
  }, [changeLanguage]);
};

export default useChangeLanguage;
