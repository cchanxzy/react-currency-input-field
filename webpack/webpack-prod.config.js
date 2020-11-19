/* eslint-disable @typescript-eslint/no-var-requires */

const baseConfig = require('./webpack-base.config');
const path = require('path');

module.exports = {
  ...baseConfig,
  name: 'prod',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'commonjs react',
  },
};
