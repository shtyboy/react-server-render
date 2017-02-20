const webpack = require ('webpack');
const fs = require ('fs');
const path = require ('path');
const autoprefixer = require ('autoprefixer');
const {commonjs, getLoaders} = require ('../config/webpack.setting');

// const ExtractTextPlugin = require ('extract-text-webpack-plugin');

let isDev = process.env.NODE_ENV !== 'production';

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;
      return externals;
    }, {});
}
module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {server: './server'},
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module:{
    loaders:getLoaders(isDev, true)
  },
  externals: getExternals(),
  resolve: {
    extensions: ['', '.js', '.jsx', 'json'],
  },
  postcss: [autoprefixer({browsers: ['last 2 version']})],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false
    }),
  ]
};
