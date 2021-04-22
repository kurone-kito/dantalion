import type { Genius } from '@kurone-kito/dantalion-core';
import getResources from './resources/t';

export interface GeniusType {
  detail: string[];
  keyword: string[];
  name: string;
  summary: string;
  strategy: string[];
  weak: string[];
}

export const getGeniusAsync = async (
  genius: Genius
): Promise<GeniusType | undefined> => {
  const result = (await getResources())<string | GeniusType>(
    `genius.${genius}`,
    { returnObjects: true }
  );
  return typeof result === 'string' ? undefined : result;
};
