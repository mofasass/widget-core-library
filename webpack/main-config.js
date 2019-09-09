const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const autoprefixer = require('autoprefixer')
const babelOptions = require('./babel-options')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')
const constants = require('./constants')

const pkg = require(path.resolve(process.cwd(), 'package.json'))

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const babelLoader = {
  loader: 'babel-loader',
  options: babelOptions(process.env.NODE_ENV),
}

const postCssOptions = {
  plugins: () => [
    autoprefixer({
      browsers: ['ie >= 11', 'ios_saf >= 7', 'and_chr >= 5', 'Last 1 versions'],
    }),
  ],
}

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      WIDGET_NAME: JSON.stringify(pkg.name),
      WIDGET_CSS_VERSION: pkg.widgetCssVersion
        ? JSON.stringify(pkg.widgetCssVersion)
        : JSON.stringify(constants.widgetCssVersion),
    },
  }),
  new CopyWebpackPlugin([
    {
      from: './src/mockSetupData.json',
      to: '.',
    },
    {
      from: './src/assets',
      to: 'assets',
    },
    {
      from: './package.json',
      to: 'package.json',
    },
  ]),
]


plugins = []

if (isProd) {
  plugins = [
    ...plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ]
}

plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false,
  })
)

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js',
  },
  ...(isDev && { devtool: 'source-map' }),
  module: {
    rules: [
      {
        oneOf: [
          // oneOf makes sure only one loader runs
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: 'localhost:8080/assets/',
                  filename: "[name].css",
                }
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: 'MOW_[name]__[local]___[hash:base64:5]',
                  ...(isDev && { sourceMap: true }),
                },
              },
              {
                loader: 'postcss-loader',
                ...(isDev
                  ? {
                      options: { sourceMap: true, ...postCssOptions },
                    }
                  : { options: postCssOptions }),
              },
              {
                loader: 'sass-loader',
                ...(isDev && { options: { sourceMap: true } }),
              },
            ],
          },
          {
            test: /widget-core-library(\/|\\)src(\/|\\)index\.js$/,
            exclude: [
              path.resolve(process.cwd(), '/node_modules/')
            ],
            use: [
              {
                loader: 'translations-loader',
              },
              babelLoader,
            ],
          },
          {
            test: /(\.js|\.jsx)$/,
            use: babelLoader,
          },
          {
            test: /(\.png|\.jpe?g)$/,
            use: 'url-loader',
          },
          {
            // if no other loader matches, it will fallback to this loader
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(process.cwd(), isEmbedded ? 'dist-embedded' : 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(process.cwd(), 'node_modules'),
    ],
  },
  resolveLoader: {
    symlinks: true,
    alias: {
      'translations-loader': path.resolve(__dirname, 'translations-loader'),
    },
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
  plugins,
}
