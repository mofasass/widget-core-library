/* eslint-disable import/no-extraneous-dependencies */
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV !== 'production'
      && process.env.NODE_ENV !== 'development') {
   throw new Error('Environment variable NODE_ENV not set, please set it to either "production or "development"')
}

var entry = {
   core: ['./src/index.js']
};

var devtool = 'source-map';

var plugins = [
   new webpack.DefinePlugin({
      'process.env': {
         NODE_ENV: process.env.NODE_ENV
      }
   }),
   new CopyWebpackPlugin([{
      from: './src/scss',
      to: 'scss'
   }])
];

// production-specific configuration
if (process.env.NODE_ENV === 'production') {
   entry = {
      'core.min': ['./src/index.js']
   }
   devtool = null;
   plugins = plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compressor: {
            warnings: true
         }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
   ]);
}

module.exports = {
   entry: entry,
   devtool: devtool,
   plugins: plugins,
   module: {
      loaders: [
         {
            test: /\.svg/,
            loader: 'svg-url-loader'
         }, {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015']
            }
         }, {
            test: /\.(jpeg|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            exclude: /node_modules/,
            loader: 'url-loader?importLoaders=1&limit=100000'
         }, {
            test: /\.ttf$|\.eot$/,
            loader: 'file',
            query: {
               name: 'font/[hash].[ext]'
            },
         }, {
            test: /\.json$/,
            loader: 'json'
         }, {
            test: /\.scss$/,
            loaders: ['css', 'sass']
         }
      ]
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      libraryTarget: 'commonjs',
      filename: '[name].js'
   },
   resolve: {
      extensions: ['', '.js', '.json', '.scss']
   }
};
