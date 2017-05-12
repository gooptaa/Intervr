import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';
import cameraReducer from './camera';
import selfReducer from './self';


const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer,
  camera: cameraReducer,
  self: selfReducer
});

export default rootReducer;
