/*****
This will keep track of the avatar's camera position and rotation.
*****/

const _ = require('lodash');

const SET_POSITION = "SET_POSITION";
const SET_ROTATION = "SET_ROTATION";

const setRotation = (data) => ({data, type: SET_ROTATION});
const setPosition = (data) => ({data, type: SET_POSITION});


export default function webRTCReducer (state = {}, action) {
  switch(action.type){
    case SET_POSITION:
      return Object.assign({}, state, {position: action.data});
    case SET_ROTATION:
      return Object.assign({}, state, {rotation: action.data});
    default: return state;
  }
}

export const setRotationStore = data => dispatch => {
  dispatch(setRotation(data));
}

export const setPositionStore = data => dispatch => {
  dispatch(setPosition(data));
}