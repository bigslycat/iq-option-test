/* @flow */

import { resolve } from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const { NODE_ENV = 'development' } = process.env;

const IS_DEV: true | void = NODE_ENV === 'development' || undefined;
const IS_PROD: true | void = NODE_ENV === 'production' || undefined;

const context = resolve(__dirname, 'src');

const browsers = [
  'last 5 versions',
  'not ie <= 9',
];

export default {
  context,
  target: 'web',
  entry: {
    ...IS_DEV && {
      patch: 'react-hot-loader/patch',
      client: 'webpack-dev-server/client?http://localhost:3000',
      ods: 'webpack/hot/only-dev-server',
    },
    main: './app.js',
  },
  output: {
    path: resolve(__dirname, 'docs'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'ramda',
            'transform-flow-strip-types',
          ],
          presets: [
            ['env', {
              modules: false,
              targets: { browsers },
            }],
            'react',
            'stage-0',
          ],
        },
      }],
    }, {
      test: /\.styl$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [autoprefixer({ browsers })],
          } },
        { loader: 'stylus-loader' },
      ],
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      }, {
        loader: 'image-webpack-loader',
        options: {
          pngquant: { quality: '65-90', speed: 4 },
          mozjpeg: { quality: 65 },
          svgo: { plugins: [
            { removeViewBox: false },
            { removeEmptyAttrs: false },
          ] },
        },
      }],
    }, {
      test: /\.pug$/i,
      use: [{
        loader: 'pug-loader',
        options: {
          pretty: IS_DEV,
        },
      }],
    }],
  },

  plugins: [
    ...(IS_DEV && [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]) || (IS_PROD && [
      new webpack.optimize.UglifyJsPlugin(),
    ]) || [],

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),

    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'page.pug',
      chunksSortMode: 'none',
    }),

    new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'async' }),
  ],

  ...IS_DEV && {
    devtool: '#source-map',
    devServer: {
      host: 'localhost',
      port: 5000,

      publicPath: '/',
      historyApiFallback: true,

      hot: true,
    },
  },
};
