/* eslint-disable @typescript-eslint/no-var-requires */

const prodConfig = require('./webpack/webpack-prod.config');
const devConfig = require('./webpack/webpack-dev.config');

module.exports = [prodConfig, devConfig];
