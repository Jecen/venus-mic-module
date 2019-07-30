'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const base = require('./webpack.common')('production')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const _ = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pkg = require('../package.json')

base.entry = {
  client: 'module.js',
}
// use chunk hash
base.output = {
  filename: `static/[name].[chunkhash:7].${pkg.name}.js`,
  chunkFilename: `static/[name].[chunkhash:7].${pkg.name}.js`,
  path: _.resolve('./dist'),
  jsonpFunction: `${pkg.name}WpJsonp`,
  publicPath: 'http://localhost:6006/', //TODO 真实独立发布环境
}
// add webpack plugins
base.plugins = [
  new ManifestPlugin({
    publicPath: 'http://localhost:6006/', //TODO 真实独立发布环境
    filter: (obj) => {
      const { isInitial } = obj
      return isInitial
    },
  }),
  new CopyWebpackPlugin([{
    from: _.resolve('./static'),
    // to the root of dist path
    to: './static',
  }]),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('module'),
  }),
  new MiniCssExtractPlugin({
    filename: `static/style/[name].[contenthash:8].${pkg.name}.css`,
    chunkFilename: `static/style/[id].[contenthash:8].${pkg.name}.css`,
  }),
  new CleanWebpackPlugin(['dist/appcache', 'dist/static', 'dist/index.html', 'dist/sw.js'], {
    root: _.cwd('.'),
  }),
]

base.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true, // set to true if you want JS source maps
      uglifyOptions: {
        compress: {
          drop_console: false,
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