import { describe, expect, it } from 'vitest';
import en from './en.json' with { type: 'json' };
import ja from './ja.json' with { type: 'json' };
import type { LocaleDocumentType } from './types.js';

type OrphanKeys<Actual, Expected> = Actual extends readonly unknown[]
  ? never
  : Actual extends object
    ? Expected extends object
      ?
          | Exclude<keyof Actual, keyof Expected>
          | {
              [Key in keyof Actual & keyof Expected]: OrphanKeys<
                Actual[Key],
                Expected[Key]
              >;
            }[keyof Actual & keyof Expected]
      : never
    : never;

const assertNoOrphanKeys = <_T extends never>(): void => {};

assertNoOrphanKeys<OrphanKeys<typeof en, LocaleDocumentType>>();
assertNoOrphanKeys<OrphanKeys<typeof ja, LocaleDocumentType>>();

describe('locale document types', () => {
  it('keeps the locale documents on the same top-level key surface', () => {
    expect(Object.keys(en).sort()).toStrictEqual(Object.keys(ja).sort());
  });
});
