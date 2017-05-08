import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

export default createStore(
  reducer,
  applyMiddleware(
    createLogger,
    thunkMiddleware
  )
);
