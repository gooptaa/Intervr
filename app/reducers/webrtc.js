/*****
This will keep track of the simplewebrtc object.
*****/

/* -------------------<   ACTIONS   >--------------------- */

const ADD_WEBRTC = "ADD_WEBRTC";

/* ---------------<   ACTION CREATORS   >------------------- */

const setWebRTC = (webRTC) => ({webRTC, type: ADD_WEBRTC});

/* -------------------<   REDUCERS   >--------------------- */

export default function webRTCReducer (state = {}, action) {
  switch(action.type){
    case ADD_WEBRTC:
      return action.webRTC;
    default: return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */

export const updateWebRTC = webRTC => dispatch => {
  dispatch(setWebRTC(webRTC));
}