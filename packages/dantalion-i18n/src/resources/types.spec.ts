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
  it('loads both locale documents for compile-time checks', () => {
    expect(en).toBeDefined();
    expect(ja).toBeDefined();
  });

  it('keeps diagonal potential aliases array-resolving', () => {
    expect(en.potentials.Ci.Ci).toBe('$t(potentials.Ci.detail)');
    expect(en.potentials.Fi.Fi).toBe('$t(potentials.Fi.detail)');
    expect(en.potentials.Ii.Ii).toBe('$t(potentials.Ii.detail)');
    expect(en.potentials.Io.Io).toBe('$t(potentials.Io.detail)');
    expect(ja.potentials.Ci.Ci).toBe('$t(potentials.Ci.detail)');
    expect(ja.potentials.Fi.Fi).toBe('$t(potentials.Fi.detail)');
    expect(ja.potentials.Ii.Ii).toBe('$t(potentials.Ii.detail)');
    expect(ja.potentials.Io.Io).toBe('$t(potentials.Io.detail)');
  });
});
