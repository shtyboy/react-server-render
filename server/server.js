import express from 'express';
import path from 'path';

import {prod as serverConfig } from '../config/serverConfig';
import app from './app';
import ssrRouter from '../client/ssr';
import routers from './routers';

const port = serverConfig.port;

const option = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['css', 'png', 'gif', 'jpg', 'js'],
  maxAge: '3600000',
  redirect: true,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};
app.use('/static', express.static(path.join(__dirname, '..', '/public')));
app.use('/static/libs', express.static(path.join(__dirname, '..', '/dist/client/libs')));

// router and ssr
app.use(routers, ssrRouter);

app.disable('x-powered-by');

app.listen(port);
console.log(`\n==> 🌎  working on env ${process.env.NODE_ENV}. Open up http://localhost:${port}/ in your browser.\n`);
