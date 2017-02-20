import express from 'express';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import {dev as serverConfig } from '../../config/serverConfig';
import app from '../app';
import config from '../../webpack/webpack.config.dev';
import routers from '../routers';

app.use('/static/', express.static(path.join(__dirname, '../..', '/public')));

if (process.env.NODE_ENV !== 'production') {
	const compiler = webpack(config);
  compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
          console.log('key', key);
            file = path.resolve(__dirname, key);
            data = assets[key].source();
            fs.writeFileSync(file, data);
        }
    });
    callback();
  });
	const {
		publicPath
	} = config.output;
	const hasColor = process.env.NODE_ENV === 'development';
	const options = {
		publicPath,
		stats: {
			colors: hasColor
		}
	};
	app.use(require('webpack-dev-middleware')(compiler, options));
	app.use(require('webpack-hot-middleware')(compiler));
}

app.use("*", (req, res, next) => {
	if (req.path.indexOf('/api/') === 0) {
		next();
	} else {
    console.info("===> sent index.html: "+req.url);
    res.sendFile(path.join(__dirname, "./index.html"));
	}
});

app.use(routers);

const server = app.listen(process.env.PORT || serverConfig.port, () => {
	const {
		port
	} = server.address();
	console.info(`当前开发环境 -> ${process.env.NODE_ENV}`) // eslint-disable-line
	console.info(`地址 ->  http://127.0.0.1:${port}`) // eslint-disable-line
});
