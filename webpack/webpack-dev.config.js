/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const baseConfig = require('./webpack-base.config');

module.exports = {
  ...baseConfig,
  name: 'dev',
  entry: './src/example.tsx',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../demo/examples'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebPackPlugin({
      template: './src/example.html',
    }),
  ],
};
