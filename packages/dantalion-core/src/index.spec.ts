import 'ts-polyfill/lib/es2019-object.js';
import { getPersonality } from '.';
import { getPersonalityTestData } from './tests';

describe('integration testing', () => {
  describe('get the personality', () => {
    it('Outputs the same value as the data source from all dates in the range', () => {
      getPersonalityTestData().forEach((source) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = getPersonality(source.date)!;
        expect({ ...result, date: source.date }).toStrictEqual({
          ...source,
          lifeBase: source.lifeBase ?? result.lifeBase,
        });
      });
    });
  });
});
