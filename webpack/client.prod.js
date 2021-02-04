const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const { injectGlobalSassHelperToScssFiles } = require('./shared');

const res = (p) => path.resolve(__dirname, p);
const entryFile = res('../src/client/client.js');
const outputFolder = path.join(__dirname, '../', '_build_prod', 'client');
const outputFileName = '[name].[chunkhash].js';

const BUILT_ASSETS_FOLDER = '/project-assets/';

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  entry: [entryFile],
  output: {
    filename: outputFileName,
    chunkFilename: outputFileName,
    path: outputFolder,
    publicPath: BUILT_ASSETS_FOLDER,
  },
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /(?!.*\.test)\.js$/,
        exclude: [
          /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
          /__snapshots__/,
        ],
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: injectGlobalSassHelperToScssFiles,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)|fa-solid-900\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'font-icons/',
            },
          },
        ],
      },
      {
        test: /^(?!fa-solid-900).*\.(png|jpg|gif|jpeg|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '..', 'src', 'client'), 'node_modules'],
    alias: {
      '@client': path.resolve(__dirname, '..', 'src', 'client'),
      '@server': path.resolve(__dirname, '..', 'src', 'server'),
      '@rc-lib-client': '@lvlsgroup/react-component-lib/src/client',
      '@rc-lib-server': '@lvlsgroup/react-component-lib/src/server',
      'lvlsgroup-components':
        '@lvlsgroup/react-component-lib/src/client/components',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 2,
        terserOptions: {
          output: {
            comments: false,
            ascii_only: true,
          },
          compress: {
            comparisons: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'bootstrap',
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.md$/,
    }),
    new ExtractCssChunks({
      filename: '[name].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        GITHUB_PERSONAL_ACCESS_TOKEN: JSON.stringify(
          process.env.GITHUB_PERSONAL_ACCESS_TOKEN
        ),
        APP_PORT: JSON.stringify(process.env.APP_PORT),
      },
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    function() {
      this.hooks.done.tap('errorChecker', function(stats) {
        const errors = stats.compilation.errors;
        if (errors && errors.length) {
          console.log(errors);
          process.exit(1);
        }
      });
    },
  ],
};
