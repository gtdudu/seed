import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

import bootstrapApp from './app.js';

export function serverProd() {

  console.log('APP: starting prod server');

  const app = express();

  app.use(morgan('common'));
  bootstrapApp(app);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.listen(1337);

  console.log('APP: Server running at http://127.0.0.1:1337/');
}

if (process.env.NODE_ENV === 'production') {
  setImmediate(serverProd);
}
