import { Router } from 'express';
import { createMemoryHistory, match } from 'react-router';
import routes from '../routes';
import bootup from './bootup';

const router = Router();

router.use((req, res, next) => {
  const history = createMemoryHistory(req.url);
  match({
    history, routes, location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    if (renderProps) {
      let {
        initialData,
        initialOptions
      } = req;
      if(!initialData) initialData = {};
      initialData.platForm = req.userUA;
      // console.log('pathname: ' + renderProps.location.pathname)
      // console.log('initialOptions: \n', initialOptions)
      res.status(200).end(bootup(renderProps, initialData)(initialOptions));
    } else {
      next();
    }
  });
});

export default router;
