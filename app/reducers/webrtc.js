/*****
This will keep track of the simplewebrtc object.
*****/

const _ = require('lodash');

const ADD_WEBRTC = "ADD_WEBRTC";

const addWebRTC = (webRTC) => ({webRTC, type: ADD_WEBRTC});

export default function peerReducer (state = {}, action) {
  switch(action.type){
    case ADD_WEBRTC:
      return action.webRTC;
    default: return state;
  }
}

export const setWebRTC = webRTC => dispatch => {
  dispatch(addWebRTC(webRTC));
}