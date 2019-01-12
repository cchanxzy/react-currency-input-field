const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (process.env.NODE_ENV === 'prod') {
  console.log('Building for production');
  config.output.libraryTarget = 'commonjs2';
  config.externals = {
    react: 'commonjs react',
  };
}

if (process.env.NODE_ENV === 'dev') {
  console.log('Building for development');
  config.entry = './src/example.tsx';

  config.plugins.push(
    new HtmlWebPackPlugin({
      template: './src/example.html',
    })
  );
}

module.exports = config;
