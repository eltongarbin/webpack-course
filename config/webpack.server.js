const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
  return {
    target: 'node',
    externals: nodeExternals(),
    entry: {
      server: ['./src/server/main.js']
    },
    mode: 'development',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../build')
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
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
                emitFile: false
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      })
    ]
  };
};
