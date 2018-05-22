import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import marked from 'marked';
import { loadFront } from 'yaml-front-matter';
import fs from 'fs';

const server = express();
const expressStaticGzip = require('express-static-gzip');

import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const PORT = process.env.PORT || 8080;
let isBuilt = false;

const done = () => {
  !isBuilt &&
    server.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on http://localhost:${PORT} in ${
          process.env.NODE_ENV
        }`
      );
    });
};

server.get('/api/articles/:slug', (req, res) => {
  try {
    const site = req.hostname.split('.')[0] || 'localhost';
    const { slug } = req.params;

    if (!slug) {
      throw new Error('No slug provided');
    }

    const file = path.resolve(__dirname, `../../data/${site}/${slug}.md`);
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        res.status(404).send(err);
        return;
      }

      const obj = loadFront(data);
      obj.__content = marked(obj.__content);
      res.json(obj);
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

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
  done();
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require('../../build/prod-server-bundle.js').default;
    console.log(
      stats.toString({
        colors: true
      })
    );
    server.use(
      expressStaticGzip('dist', {
        enableBrotli: true
      })
    );
    server.use(render({ clientStats }));
    done();
  });
}
