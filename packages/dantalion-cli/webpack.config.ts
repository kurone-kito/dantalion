import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import { dependencies, name } from './package.json';

const distDir = path.resolve(__dirname, 'dist');

export default (): webpack.Configuration => ({
  cache: true,
  devtool: false,
  externals: [/json/, ...Object.keys(dependencies || {})],
  mode: 'production',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: { configFile: '.eslintrc.yml' }
      }
    ]
  },
  output: {
    filename: 'index.js',
    library: name,
    libraryTarget: 'commonjs2',
    path: distDir
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new WebpackShellPluginNext({
      onBuildExit: {
        scripts: [() => fs.chmodSync(path.resolve(distDir, 'index.js'), 0o755)],
        blocking: true,
        parallel: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  target: 'node'
});
