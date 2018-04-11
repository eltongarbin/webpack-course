const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  name: 'client',
  entry: {
    vendor: ['react', 'lodash'],
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
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      // {
      //   test: /\.ejs$/,
      //   use: [{ loader: 'ejs-loader' }]
      // },
      {
        test: /\.md$/,
        use: [{ loader: 'markdown-with-front-matter-loader' }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true
      }
    }),
    // new webpack.NamedModulesPlugin(),
    // new HTMLWebpackPlugin({
    //   template: './src/index.ejs',
    //   title: "Link's Journal"
    // }),
    new webpack.NamedModulesPlugin(),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new BrotliPlugin()
  ]
};
