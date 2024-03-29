'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const base = require('./webpack.common')('production')
const _ = require('./utils')
// use chunk hash
base.output = {
  filename: 'static/[name].[chunkhash:7].js',
  chunkFilename: 'static/[name].[chunkhash:7].js',
  path: _.resolve('./dist'),
  publicPath: '/',
}
// add webpack plugins
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new MiniCssExtractPlugin({
    filename: 'static/style/[name].[contenthash:8].css',
    chunkFilename: 'static/style/[id].[contenthash:8].css',
  }),
  new CleanWebpackPlugin(['dist/appcache', 'dist/static', 'dist/index.html', 'dist/sw.js'], {
    root: _.cwd('.'),
  }),
  new OfflinePlugin({
    Caches: 'all',
    ServiceWorker: {
      events: true,
      navigateFallbackURL: '/',
    },
    AppCache: {
      events: true,
      FALLBACK: {
        '/': '/',
      },
    },
  })
)

base.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: false, // set to true if you want JS source maps
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
  ],
  runtimeChunk: 'single',
  splitChunks: {
    // Must be specified for HtmlWebpackPlugin to work correctly.
    // See: https://github.com/jantimon/html-webpack-plugin/issues/882
    chunks: 'all',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 5,
    name: true,
  },
}

// minimize webpack output
base.stats = {
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false,
}

module.exports = base