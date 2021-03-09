import { Detail } from '../records/details';
import { Genius } from '../types/genius';
import { Personality } from '../utils/getPersonality';
import details from './details.json';
import personality from './personality.json';

export type DetailTestData = Omit<Detail, 'affinity'>;

export interface PersonalityTestData extends Personality {
  date: string;
}

export const getDetailTestData = (): Record<Genius, DetailTestData> =>
  <Record<Genius, DetailTestData>>details;

export const getPersonalityTestData = (): PersonalityTestData[] =>
  <PersonalityTestData[]>personality;
