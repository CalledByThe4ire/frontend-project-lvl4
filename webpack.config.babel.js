// @ts-check

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[key] = JSON.stringify(env[key]);
  return acc;
}, {});

const isProduction = process.env.NODE_ENV === 'production';

console.log('isProduction', isProduction);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  devServer: {
    publicPath: '/assets/',
    compress: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ...envKeys,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
