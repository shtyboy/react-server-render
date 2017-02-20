const webpack = require ('webpack');
const fs = require ('fs');
const path = require ('path');
const autoprefixer = require ('autoprefixer');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const {commonjs, getLoaders} = require ('../config/webpack.setting');

// const HtmlWebpackPlugin = require('html-webpack-plugin');

let isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: isDev?'#inline-source-map':false,
  entry: {
    client: './client/entry',
    common: commonjs
  },
  // fs.readdirSync(path.resolve(__dirname, '../src/client')).reduce(function (entries, dir) {
  //   // console.log(dir)
  //   if (fs.statSync(path.join(__dirname, '..', '/src/client/', dir)).isFile()){
  //     let name = dir.slice(0, dir.lastIndexOf('.'));
  //     if(name && dir.lastIndexOf('.js')>=dir.length-4){
  //       entries[name] = path.join(__dirname, '..', '/src/client/', dir);
  //     }
  //   }
  //   return entries;
  // }, {}),
  output: {
    path: path.join(__dirname, '..', '/dist/client/libs/'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/page.[name].[chunkhash:8].js',
    publicPath: `/static/libs/`
  },
  module: {
    loaders: getLoaders(isDev)
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'json'],
  },
  postcss: [autoprefixer({browsers: ['last 2 version']})],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: !isDev,
        drop_console: !isDev
      },
      comments: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'common',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css', {allChunks: true}),
    // 输出 hash
    function () {
      this.plugin('done', stats => {
        let assets = stats.toJson().assets;
        // console.log('\n assets: \n', assets)
        let buildTemplatePath = path.join(__dirname, '..', '/dist/client');
        let name = {
          js:{},
          css:{}
        };
        for (let i = 0; i < assets.length; i++) {
          if (assets[i].name.startsWith('css/')) {
            name.css[assets[i].chunkNames[0]] = assets[i];
          }else if (assets[i].name.startsWith('js/')){
            name.js[assets[i].chunkNames[0]] = assets[i];
          }
        }
        // console.log('\n name: \n', name)
        fs.stat(buildTemplatePath, (err, stats) => {
          if (err) {
            fs.mkdirSync(buildTemplatePath);
          }
          fs.writeFile(buildTemplatePath+'/hash.json', JSON.stringify(name), err => {
            if (err) {
              console.error(err);
            }
          });
        });
      });
    }
  ],
};
