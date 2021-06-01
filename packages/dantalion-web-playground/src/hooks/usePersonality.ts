import { getPersonality, Personality } from '@kurone-kito/dantalion-core';
import { Base64 } from 'js-base64';
import Router from 'next/router';
import { FormEventHandler, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormState } from '../stores/FormReducer';
import { decode, encode } from '../utils/psCompress';

export const spliter = '~';

export const usePSDecoder = (): readonly [Personality | undefined, string] => {
  const [pb = '', nb] = (
    (process.browser && Object.keys(Router.query).shift()) ||
    ''
  ).split(spliter);
  const { t } = useTranslation();
  return [
    decode(pb),
    (nb && Base64.decode(nb)) || t('web.result.nickname'),
  ] as const;
};

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
