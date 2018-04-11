const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  name: 'client',
  entry: {
    vendor: ['react', 'react-dom'],
    main: [
      'react-hot-loader/patch',
      'babel-runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/main.js'
    ]
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].js',
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
  devtool: 'source-map',
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
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          { loader: 'extract-loader' },
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      },
      {
        test: /\.ejs$/,
        use: [{ loader: 'ejs-loader' }]
      },
      {
        test: /\.md$/,
        use: [{ loader: 'markdown-with-front-matter-loader' }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    // new HTMLWebpackPlugin({
    //   template: './src/index.ejs',
    //   inject: true,
    //   title: "Link's Journal"
    // })
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true
    // })
  ]
};
