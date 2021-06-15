const { withSentryConfig } = require('@sentry/nextjs');

const productDomain = 'https://kurone-kito.github.io';
const productPath = '/dantalion/';
const isProd = process.env.NODE_ENV === 'production';

/** @type {Partial<import('next/dist/next-server/server/config-shared').NextConfig>} */
const providedExports = {
  assetPrefix: isProd ? productDomain + productPath : '',
  env: { productDomain, productPath },
  future: { webpack5: true },
  // i18n: { defaultLocale: 'en', locales: ['en', 'ja'] },
  reactStrictMode: true,
};

module.exports = withSentryConfig(providedExports, {});
