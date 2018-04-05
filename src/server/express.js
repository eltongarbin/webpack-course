import express from 'express';
import path from 'path';

const server = express();
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );
  const webpackHotMiddleware = require('webpack-hot-middleware')(
    compiler,
    config.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
}

const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
});
