import path from 'path';
import webpack from 'webpack';
import packageJson from './package.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DtsBundleWebpack = require('dts-bundle-webpack');

export default (source: webpack.Configuration): webpack.Configuration => ({
  ...source,
  cache: true,
  devtool: false,
  entry: ['./src/index.ts'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  externals: Object.keys(packageJson.dependencies ?? {}),
  mode: 'production',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: { cache: true, configFile: '.eslintrc.yml' },
      },
      {
        test: /\.ya?ml$/,
        // Required by Webpack v4
        type: 'json',
        use: 'yaml-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    library: packageJson.name,
    libraryTarget: 'umd',
  },
  plugins: [
    new DtsBundleWebpack({
      indent: '  ',
      main: 'src/index.d.ts',
      name: packageJson.name,
      out: '../dist/index.d.ts',
    }),
  ],
  resolve: { extensions: ['.js', '.json', '.ts', '.tsx'] },
  target: 'node',
});
