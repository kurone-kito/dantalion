import type { Genius } from '@kurone-kito/dantalion-core';
import type { PersonalityType } from './resources/types';
import getResourcesAccessor from './resources';

export const getGeniusAsync = getResourcesAccessor<PersonalityType, Genius>(
  'genius'
);
