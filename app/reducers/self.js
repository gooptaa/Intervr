/*****
  This keeps track of the current user's info such as their handle and room.
  The default state of this is a random name and a random room.
*****/

import {randomToken, randomName} from '../util';

const SET_HANDLE = "SET_HANDLE";
const SET_ROOM = "SET_ROOM";

const setHandle = handle => ({handle, type: SET_HANDLE});
const setRoom = room => ({room, type: SET_ROOM});

export default function selfReducer (state = {handle: randomName(), room: randomToken()}, action) {
  switch(action.type){
    case SET_HANDLE:
      return Object.assign({}, state, {handle: action.handle});
    case SET_ROOM:
      return Object.assign({}, state, {room: action.room});
    default: return state;
  }
}

export const updateHandle = handle => dispatch => dispatch(setHandle(handle));
export const updateRoom = room => dispatch => dispatch(setRoom(room));
