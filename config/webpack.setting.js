const autoprefixer = require ('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonjs = [
  'babel-polyfill',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
];
function getLoaders(isDev, isServer) {
  let cssPre = 'style!';
  if (isServer) {
    cssPre = ''; // fix 'window is not defined' for nodejs
  }
  return [{
    test: /\.css$/,
    loader: (isServer || isDev) ? `${cssPre}css?minimize&-autoprefixer!postcss` : ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
    // loader: `style!css`,
  }, {
    test: /\.js$|\.jsx$/,
    loader: isDev ? `babel?cacheDirectory` : `babel`,
    exclude: /node_modules/,
  }, {
    test: /\.less$/,
    loader: (isServer || isDev) ? `${cssPre}css?minimize&-autoprefixer!postcss!less` : ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss!less'),
  }, {
    test: /.*\.(png|gif|svg|jpg)$/,
    loader: 'url?limit=8192&name=images/[name].[hash:8].[ext]',
  }, {
    test: /\.json$/,
    loader: 'json',
  }];
}

module.exports = {
  commonjs,
  getLoaders,
};
