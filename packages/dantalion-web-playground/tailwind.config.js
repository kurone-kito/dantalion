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
