const webpack = require('webpack');
const path = require('path');
const ExtractorPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'dist/public'),
    // we use hash and name so that the client can cash the different versions..
    filename: '[hash]-[name].js',
    publicPath: '/'
  },
  node: {
    // Prevents the `process.env` defined in server response
    // from being re-defined inside modules
    // see https://github.com/webpack/node-libs-browser
    process: false
  },

  plugins: [

    // option passed to loggers
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),

    // This plugin extract css to a different bundle file.
    // available options : [name], [hash]
    new ExtractorPlugin('client-[hash]-[name].css'),

    // This plugin optimizes chunks and modules by
    // how much they are used in the app
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // uglify everything (also does minifying out of the box)
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // define custom env variable throught webpack
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
        BROWSER: 'true',
      },
    }),

    new HtmlWebpackPlugin({
      path: path.join(__dirname, '../dist'),
      template: './client/index.html', // Load a custom template (lodash by default see the FAQ for details)
      filename: '../index.html',
    }),

    new ExtractTextPlugin('style-[contentHash]-[id].css'),
    new CopyWebpackPlugin([{ from: 'client/assets/images', to: '' }]),

  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer'),
                ]
              },
            }
          ],
        })
      },
      {
        test: /\.js$/,
        include: `${__dirname}/client`,
        loaders: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
};
