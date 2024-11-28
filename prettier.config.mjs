import config from '@kurone-kito/prettier-config/.prettierrc.json' with { type: 'json' };

export default {
  ...config,
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-sh',
    'prettier-plugin-sort-json',
  ],
};
