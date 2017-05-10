import { combineReducers } from 'redux';
import peerReducer from './peer';
import webRTCReducer from './webrtc';
import cameraReducer from './camera';


const rootReducer = combineReducers({
  peer: peerReducer,
  webRTC: webRTCReducer,
  camera: cameraReducer
});

export default rootReducer;
