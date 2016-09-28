var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: {
      'core': ['./src/index.js']
   },
   module: {
      loaders: [
         { test: /\.svg/, loader: 'svg-url-loader' },
         { test: /.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } },
         {
            test: /\.(jpeg|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            exclude: /node_modules/,
            loader: 'url-loader?importLoaders=1&limit=100000'
         },
         { test: /\.ttf$|\.eot$/, loader: 'file', query: { name: 'font/[hash].[ext]' }, },
         { test: /\.json$/, loader: 'json' },
         { test: /\.scss$/, loaders: ['css', 'sass'] }]
   },
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      library: 'widget-core-library',
      libraryTarget: 'commonjs',
      filename: '[name].js'
   },
   plugins: [
      new CopyWebpackPlugin([{
         from: './src/scss',
         to: 'scss'
      }])
   ],
   resolve: {
      extensions: ['', '.js', '.json', '.scss']
   }
};
