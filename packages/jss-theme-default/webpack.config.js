/* eslint-disable  */
const path = require("path");
const webpack = require("webpack");
const pkg = require('./package.json');

const peerDependencies = () => {
  if (!pkg.peerDependencies) return { };
  const peer = { };
  Object.keys(pkg.peerDependencies).forEach((key) => { peer[key] = key });
  return peer;
}

module.exports = {
  mode: process.env.npm_config_dev ? 'development' : 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: path.resolve(__dirname, './src/index.ts'),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ]
  },

  externals: peerDependencies(),

  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
};
