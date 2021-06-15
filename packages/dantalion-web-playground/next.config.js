const { withSentryConfig } = require('@sentry/nextjs');

const localDomain = '';
const productDomain = 'https://kurone-kito.github.io';
const productPath = '/dantalion/';
const isCIProd = !!process.env.CI && process.env.NODE_ENV === 'production';
const assetPrefix = isCIProd ? productDomain + productPath : localDomain;

/** @type {Partial<import('next/dist/next-server/server/config-shared').NextConfig>} */
const providedExports = {
  assetPrefix,
  env: { assetPrefix, productDomain, productPath },
  future: { strictPostcssConfiguration: true },
  // i18n: { defaultLocale: 'en', locales: ['en', 'ja'] },
  reactStrictMode: true,
  webpack5: true,
};

module.exports = withSentryConfig(providedExports, {});
