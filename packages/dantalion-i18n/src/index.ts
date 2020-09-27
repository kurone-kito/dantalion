import { Genius } from '@kurone-kito/dantalion-core';
import getResources from './resources';

export interface GeniusType {
  detail: string[];
  keyword: string[];
  name: string;
  summary: string;
  strategy: string[];
  weak: string[];
}

export const getGeniusAsync = async (genius: Genius) => {
  const result = (await getResources())<string | GeniusType>(
    `genius.${genius}`,
    { returnObjects: true }
  );
  return typeof result === 'string' ? undefined : result;
};
