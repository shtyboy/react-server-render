import React from 'react';
import {Provider } from 'react-redux';
import {RouterContext } from 'react-router';
import {renderToString } from 'react-dom/server';
import createStore from '../store';
import buildHash from '../../dist/client/hash.json';
const createPage = (content = '', state = {}, options = {
  lang: 'zh',
  page: 'client',
  title: 'app',
  meta: '',
  link: ''
}) => {
  // 返回初始网页信息
  return `<!DOCTYPE html>
  <html lang=${options.lang}>
    <head>
      <title>${options.title}</title>
      <link rel="shortcut icon" href="/static/images/favicon.ico">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="description" content="${options.description}" />
      <meta name="keywords" content="${options.keywords}" />
      <link rel="stylesheet" href="/static/libs/${buildHash.css.client.name}"></link>
      ${options.meta}
      ${options.link}
    </head>
    <body>
      <div id="root">${content}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
      <script src="/static/libs/${buildHash.js.common.name}"></script>
      <script src="/static/libs/${buildHash.js.client.name}"></script>
    </body>
  </html>`;
};

export default (renderProps, initialData) => {
  const store = createStore(initialData);
  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps}/>
    </Provider>
  );
  const state = store.getState();
  return (options) => createPage(content, state, options);
};
