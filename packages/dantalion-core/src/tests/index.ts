import { Personality } from '../utils/getPersonality';
import json from './source.json';

export interface TestData extends Personality {
  date: string;
}

export default () => json as TestData[];
