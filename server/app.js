import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}else {
  app.use(morgan('tiny'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(compression());
app.use(methodOverride());
export default app;
