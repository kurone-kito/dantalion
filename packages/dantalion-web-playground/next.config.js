const productDomain = 'https://kurone-kito.github.io';
const productPath = '/dantalion/';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? productDomain + productPath : '',
  env: { productDomain, productPath },
  future: { webpack5: true },
  // i18n: { defaultLocale: 'en', locales: ['en', 'ja'] },
  reactStrictMode: true,
};
