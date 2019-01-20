const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    // publicPath: '/templates/childinfi-site/app/js/',
    publicPath: '/js/',
  },
});