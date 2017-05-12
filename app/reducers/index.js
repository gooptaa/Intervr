import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';
import cameraReducer from './camera';
import botReducer from './bot';


const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer,
  camera: cameraReducer,
  bot: botReducer,
});

export default rootReducer;
