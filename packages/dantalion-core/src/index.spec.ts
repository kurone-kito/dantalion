import 'ts-polyfill/lib/es2019-object.js';
import { getPersonality } from '.';
import { getPersonalityTestData } from './tests';

describe('integration testing', () => {
  describe('get the personality', () => {
    it('Outputs the same value as the data source from all dates in the range', () => {
      getPersonalityTestData().forEach(source => {
        const result = getPersonality(source.date)!;
        expect({ ...result, date: source.date }).toStrictEqual({
          ...source,
          lifeBase: source.lifeBase ?? result.lifeBase
        });
      });
    });
  });
});
