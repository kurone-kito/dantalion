import { describe, expect, it } from 'vitest';
import en from './en.json' with { type: 'json' };
import ja from './ja.json' with { type: 'json' };
import type { LocaleDocumentType } from './types.js';

const assertNoOrphanKeys = <_T extends never>(): void => {};

assertNoOrphanKeys<Exclude<keyof typeof en, keyof LocaleDocumentType>>();
assertNoOrphanKeys<Exclude<keyof typeof ja, keyof LocaleDocumentType>>();

describe('locale document types', () => {
  it('keeps the locale documents on the same top-level key surface', () => {
    expect(Object.keys(en).sort()).toStrictEqual(Object.keys(ja).sort());
  });
});
