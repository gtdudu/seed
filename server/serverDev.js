import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import Promise from 'bluebird';

import webpackConfig from '../config-webpack.dev.client.js';
import bootstrapApp from './app.js';


if (process.env.NODE_ENV !== 'test') {
  setImmediate(serverDev);
}

export function serverDev() {

  console.log('APP: starting dev server');

  const app = express();

  const compiler = webpack(webpackConfig);
  console.log('[webpack] Starting build.');
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  });

  return new Promise((resolve) => {
    middleware.waitUntilValid(() => {
      console.log('[webpack] Build is in a valid state.');
      resolve();
    });
  })
    .then(() => {

      bootstrapApp(app);

      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(express.static(path.join(__dirname, 'public')));

      app.use(middleware);

      app.use((req, res, next) => {
        const filename = path.join(compiler.outputPath, '../index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) {
            return next(err);
          }
          res.set('content-type', 'text/html');
          res.send(result);
          res.end();
        });
      });

      console.log('verbose: You need to reload your browser when making changes to the front end!');
      app.listen(1337);

      console.log('APP: Server running at http://127.0.0.1:1337/');
    });
}
