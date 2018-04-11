import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client';
import configDevServer from '../../config/webpack.dev-server';
import configProdClient from '../../config/webpack.prod-client';
import configProdServer from '../../config/webpack.prod-server';

const server = express();
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const expressStaticGzip = require('express-static-gzip');

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  require('webpack-mild-compile')(compiler);

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    configDevClient.devServer
  );
  const webpackHotMiddleware = require('webpack-hot-middleware')(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
  server.use(webpackHotServerMiddleware(compiler));
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const render = require('../../build/prod-server-bundle.js').default;
    server.use(
      expressStaticGzip('dist', {
        enableBrotli: true
      })
    );
    server.use(render());
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
