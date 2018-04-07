const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = (env) => {
  return {
    entry: {
      main: ['./src/main.js']
    },
    mode: 'production',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/'
    },
    devServer: {
      contentBase: 'dist',
      overlay: true,
      stats: {
        colors: true
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true, sourceMap: false }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: false }
              }
            ]
          })
        },
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true, sourceMap: false }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: false }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: false }
              }
            ]
          })
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true, sourceMap: false }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: false }
              },
              {
                loader: 'less-loader',
                options: { sourceMap: false }
              }
            ]
          })
        },
        {
          test: /\.jpg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name]-[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [{ loader: 'html-loader' }]
        },
        {
          test: /\.ejs$/,
          use: [{ loader: 'ejs-loader' }]
        },
        {
          test: /\.pug$/,
          use: [{ loader: 'pug-loader' }]
        },
        {
          test: /\.hbs$/,
          use: [
            {
              loader: 'handlebars-loader',
              query: {
                inlineRequires: '/images/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          },
          canPrint: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      }),
      new webpack.NamedModulesPlugin(),
      new HTMLWebpackPlugin({
        template: './src/index.ejs',
        title: "Link's Journal"
      }),
      // new MinifyPlugin(),
      new UglifyJSPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip'
      }),
      new BrotliPlugin()
    ]
  };
};
