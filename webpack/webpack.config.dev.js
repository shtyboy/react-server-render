const webpack = require('webpack');
const path = require('path');
const autoprefixer = require ('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {commonjs, getLoaders} = require ('../config/webpack.setting');
// const {commonjs} = require ('../config/webpack.setting');

//noinspection JSUnresolvedFunction
module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: 'eval-source-map',
  entry: {
    client: [
      path.join(__dirname, '..', '/client/entry'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
      // 'webpack-hot-middleware/client?noInfo=true&reload=true',

    ],
    common: commonjs
  },
  output: {
    path: `${__dirname}/dist/assets`,
    filename: '[name].js',
    publicPath: '/assets/',
  },
  module: {
    loaders: getLoaders(true)
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'json'],
  },
  postcss: [autoprefixer({browsers: ['last 2 version']})],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'common',
      filename: '[name].js'
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './client/index.tpl.html'
    })
  ],
};
