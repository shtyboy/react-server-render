import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(
  createLogger({
    level: 'info',
    duration : true,
    timestamp : true, 
    // colors: ColorsObject,
  }),
  thunkMiddleware
)(createStore);

export default (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if(module.hot){
    module.hot && module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }
  return store;
};
