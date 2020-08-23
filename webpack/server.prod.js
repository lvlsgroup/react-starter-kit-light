const path = require('path');
const webpack = require('webpack');
const res = (p) => path.resolve(__dirname, p);

const entry = res('../src/server/render.js');
const output = res('../_build_prod/server');

const BUILT_ASSETS_FOLDER = '/project-assets/';

module.exports = {
  mode: 'production',
  name: 'server',
  target: 'node',
  entry: [entry],
  output: {
    path: output,
    filename: 'render.js',
    libraryTarget: 'commonjs2',
    publicPath: BUILT_ASSETS_FOLDER,
  },
  module: {
    rules: [
      {
        test: /(?!.*\.test)\.js$/,
        exclude: /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
        use: [
          {
            loader: 'css-loader/locals',
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
              data:
                `@import "${res(
                  '../src/client/shared/styles/globals.scss'
                )}";` + ` $node-env: ${process.env.NODE_ENV};`,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules\/(?!(@lvlsgroup\/react-component-lib)\/).*/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)|fa-solid-900\.svg$/,
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
        test: /^(?!fa-solid-900).*\.(png|jpg|gif|jpeg)$/,
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
    mainFields: ['main'],
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
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      'process.env.SERVER': JSON.stringify(true),
    }),
    new webpack.HashedModuleIdsPlugin(),
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
