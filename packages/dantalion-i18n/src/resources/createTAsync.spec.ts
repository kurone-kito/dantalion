import type { Resource, ThirdPartyModule } from 'i18next';
import { describe, expect, it } from 'vitest';
import createTAsync from './createTAsync.js';

describe('`createTAsync()` function', () => {
  it('Get the function', async () =>
    expect(await createTAsync()).toEqual(expect.any(Function)));

  it('Keeps translators isolated between calls', async () => {
    const english = await createTAsync({ lng: 'en' });
    const japanese = await createTAsync({ lng: 'ja' });

    expect(english('descriptions.detail', { type: 'example' })).toContain(
      'Details of people',
    );
    expect(japanese('descriptions.detail', { type: 'example' })).toContain(
      '性格タイプ',
    );
  });

  it('Exposes the initialized locale', async () => {
    expect((await createTAsync({ lng: 'ja' })).locale).toBe('ja');
  });

  it('Merges additions without mutating them', async () => {
    const additions: Resource = {
      en: {
        translation: {
          descriptions: { detail: 'Custom details for {{type}}.' },
        },
      },
    };
    const before = structuredClone(additions);
    const translate = await createTAsync({ lng: 'en', additions });

    expect(translate('descriptions.detail', { type: 'example' })).toBe(
      'Custom details for example.',
    );
    expect(additions).toStrictEqual(before);
  });

  it('Accepts a single third-party plugin', async () => {
    let initialized = false;
    const plugin: ThirdPartyModule = {
      type: '3rdParty',
      init: () => {
        initialized = true;
      },
    };

    await createTAsync({ lng: 'en', use: plugin });

    expect(initialized).toBe(true);
  });

  it('Accepts an array of third-party plugins', async () => {
    const initialized: string[] = [];
    const plugin = (name: string): ThirdPartyModule => ({
      type: '3rdParty',
      init: () => {
        initialized.push(name);
      },
    });

    await createTAsync({
      lng: 'en',
      use: [plugin('first'), plugin('second')],
    });

    expect(initialized).toStrictEqual(['first', 'second']);
  });
});
