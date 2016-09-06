var path = require('path');
var plugins = require('webpack-load-plugins')();
const webpack = require('webpack');

module.exports = {
   entry: {
      core: ["./src/js/coreLibrary.js"]
   },
   module: {
      preLoaders: [
         {
            test: /.js$/, // include .js files
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            loader: 'jshint-loader'
         }
      ],
      loaders: [{
         test: /.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
            presets: ['es2015']
         }
      }, {
         test: /.sass$/,
         exclude: /node_modules/,
         loader: 'sass-loader',
      }]
   },
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/",
      filename: "[name].js"
   },
   devServer: {
      contentBase: "./dist",
   },
   plugins: [],
   resolve: {
      extensions: ['', '.js', '.json']
   }
};