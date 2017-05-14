import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';
import cameraReducer from './camera';
import selfReducer from './self';
import botReducer from './bot';

const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer,
  camera: cameraReducer,
  self: selfReducer,
  bot: botReducer
});

export default rootReducer;
