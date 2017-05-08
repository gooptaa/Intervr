import { combineReducers } from 'redux';
import peerReducer from './peer';

const rootReducer = combineReducers({
  peer: peerReducer
});

export default rootReducer;
