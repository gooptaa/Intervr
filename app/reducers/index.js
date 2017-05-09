import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';

const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer
});

export default rootReducer;
