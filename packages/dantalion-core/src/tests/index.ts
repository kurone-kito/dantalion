import { Personality } from '../utils/getPersonality';
import personality from './personality.json';

export interface PersonalityTestData extends Personality {
  date: string;
}

export const getPersonalityTestData = () =>
  personality as PersonalityTestData[];
