import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';
import cameraReducer from './camera';
import botReducer from './bot';
import selfReducer from './self';


const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer,
  camera: cameraReducer,
  bot: botReducer,
  self: selfReducer
});

export default rootReducer;
