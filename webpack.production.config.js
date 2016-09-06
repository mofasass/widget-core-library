var path = require('path');
var plugins = require('webpack-load-plugins')();
const webpack = require('webpack');

module.exports = {
   entry: {
      'core.min' : ['./src/index.js']
   },
   module: {
      preLoaders: [
         {
            test: /.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
         }
      ],
      loaders: [
         {test: /\.svg/, loader: 'svg-url-loader'},
         {test: /.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}},
         {
            test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            exclude: /node_modules/,
            loader: 'url-loader?importLoaders=1&limit=100000'
         },
         {test: /\.ttf$|\.eot$/, loader: 'file', query: {name: 'font/[hash].[ext]'},},
         {test: /\.scss$/, loaders: ['style', 'css', 'sass']}]
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js'
   },
   devServer: {
      contentBase: "./dist",
   },
   sassLoader: {
      includePaths: [path.resolve(__dirname, './src/scss')]
   },
   resolve: {
      extensions: ['', '.js', '.json', '.scss']
   }
};