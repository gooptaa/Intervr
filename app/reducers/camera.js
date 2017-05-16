/*****
This will keep track of the avatar's camera position and rotation.
*****/

/* -------------------<   ACTIONS   >--------------------- */

const SET_POSITION = "SET_POSITION";
const SET_ROTATION = "SET_ROTATION";
const SET_ANIMATION = "SET_ANIMATION"

/* ---------------<   ACTION CREATORS   >------------------- */

const setRotation = (data) => ({data, type: SET_ROTATION});
const setPosition = (data) => ({data, type: SET_POSITION});
const setAnimation = (data) => ({data, type: SET_ANIMATION})

/* -------------------<   REDUCERS   >--------------------- */

export default function cameraReducer (state = {position: {x:-2.7, y: -1.7, z: 1.8}, rotation: {x: 0, y: 0, z: 0}}, action) {
  switch(action.type){
    case SET_POSITION:
      return Object.assign({}, state, {position: action.data});
    case SET_ROTATION:
      return Object.assign({}, state, {rotation: action.data});
    case SET_ANIMATION:
      return Object.assign({}, state, {animation: action.data})
    default: return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */

export const updateRotation = data => dispatch => {
  dispatch(setRotation(data));
}

export const updatePosition = data => dispatch => {
  dispatch(setPosition(data));
}

export const updateAnimation = data => dispatch => {
  dispatch(setAnimation(data))
}
