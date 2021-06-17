import { getPersonality, Personality } from '@kurone-kito/dantalion-core';
import { Base64 } from 'js-base64';
import Router, { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormState } from '../stores/FormReducer';
import { decode, encode } from '../utils/psCompress';
import useIsSsr from './useIsSsr';

/** The splitter that between to personality code and nickname. */
export const spliter = '~';

const excludes = Object.freeze(['genius', 'lang']);

/** It's the React custom hook which it decodes to personality code. */
export const usePSDecoder = (): readonly [Personality | undefined, string] => {
  const isSsr = useIsSsr();
  const { query } = useRouter();
  const [pb = '', nb] = (
    (isSsr(true) && Object.keys(query).find((q) => !excludes.includes(q))) ||
    ''
  ).split(spliter);
  const { t } = useTranslation();
  return [
    decode(pb),
    (nb && Base64.decode(nb)) || t('web.result.nickname'),
  ] as const;
};

/**
 * It's the React custom hook which it encodes to personality code
 * and redirects.
 * @param props Specifies the store object.
 */
export const usePSRedirection = ({
  birthday,
  nickname,
}: FormState): FormEventHandler<HTMLFormElement> =>
  useCallback(
    async (e) => {
      e.preventDefault();
      const ps = getPersonality(birthday) ?? false;
      const n = Base64.encode(nickname, true);
      return (
        ps && Router.push({ query: `${encode(ps)}${n && `${spliter}${n}`}` })
      );
    },
    [birthday, nickname]
  );
