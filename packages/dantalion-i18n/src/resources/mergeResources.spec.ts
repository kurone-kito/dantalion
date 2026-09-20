import type { Resource } from 'i18next';
import { describe, expect, it } from 'vitest';
import { mergeResources } from './mergeResources.js';

describe('`mergeResources()` function', () => {
  it('deep-merges additions after built-in resources', () => {
    const base: Resource = {
      en: {
        translation: {
          nested: { base: 'base', shared: 'built-in' },
          scalar: 'built-in',
        },
      },
    };
    const additions: Resource = {
      en: {
        translation: {
          nested: { addition: 'addition', shared: 'addition' },
          scalar: 'addition',
        },
      },
    };

    expect(mergeResources(base, additions)).toStrictEqual({
      en: {
        translation: {
          nested: { addition: 'addition', base: 'base', shared: 'addition' },
          scalar: 'addition',
        },
      },
    });
  });

  it('replaces arrays wholesale and does not mutate either source', () => {
    const base: Resource = {
      en: { translation: { values: ['built-in', { value: 'base' }] } },
    };
    const additions: Resource = {
      en: { translation: { values: ['addition'] } },
    };
    const baseBefore = structuredClone(base);
    const additionsBefore = structuredClone(additions);

    const result = mergeResources(base, additions);
    const translation = result.en?.translation;
    if (!translation || typeof translation !== 'object') {
      throw new Error('expected an English translation resource');
    }
    const values = (translation as { values: unknown[] }).values;
    values.push('result-only');

    expect(result.en?.translation).toStrictEqual({
      values: ['addition', 'result-only'],
    });
    expect(base).toStrictEqual(baseBefore);
    expect(additions).toStrictEqual(additionsBefore);
  });

  it('ignores recursive prototype-pollution keys', () => {
    const additions = JSON.parse(
      '{"en":{"translation":{"safe":"kept","__proto__":{"polluted":"yes"},"constructor":{"prototype":{"polluted":"yes"}}}}}',
    ) as Resource;

    const result = mergeResources({}, additions);

    expect(result).toStrictEqual({ en: { translation: { safe: 'kept' } } });
    expect(Object.prototype).not.toHaveProperty('polluted');
  });
});
