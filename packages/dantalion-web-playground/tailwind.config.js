const defaultTheme = require('tailwindcss/defaultTheme');
const neumorphism = require('tailwindcss-neumorphism');

module.exports = {
  darkMode: 'media', // false, or 'media' or 'class'
  plugins: [neumorphism],
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    options: { whitelist: ['bg-gray-800', 'mx-0', 'my-5', 'overflow-scroll'] },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          ...new Set([
            '-apple-system',
            'BlinkMacSystemFont',
            'BIZ UDPGothic',
            'system-ui',
            'Helvetica Neue',
            'Helvetica',
            'Ubuntu',
            'Droid Sans',
            'Hiragino Sans',
            'Hiragino Kaku Gothic ProN',
            'Arial',
            'Yu Gothic',
            'Meiryo',
            ...defaultTheme.fontFamily.sans,
          ]),
        ],
      },
    },
  },
  variants: { extend: {} },
};
