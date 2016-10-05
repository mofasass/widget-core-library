/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

if (process.env.NODE_ENV !== 'production'
      && process.env.NODE_ENV !== 'development') {
   throw new Error('Environment variable NODE_ENV not set, please set it to either "production or "development"')
}

let devtool = 'source-map';

let plugins = [
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
   plugins = plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            screw_ie8: true,
            warnings: false
         },
         mangle: {
            screw_ie8: true
         },
         output: {
            comments: false,
            screw_ie8: true
         }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
   ]);
}

module.exports = {
   devtool: devtool,
   plugins: plugins,
   entry: {
      core: ['./src/index.js']
   },
   module: {
      loaders: [
         {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015']
            }
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
