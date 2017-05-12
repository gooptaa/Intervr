/*****
  This keeps track of the current user's info such as their handle.
*****/

const SET_HANDLE = "SET_HANDLE";

const setHandle = handle => ({handle, type: SET_HANDLE});

export default function selfReducer (state = {}, action) {
  switch(action.type){
    case SET_HANDLE:
      return Object.assign({}, state, {handle: action.handle});
    default: return state;
  }
}

export const updateHandle = handle => dispatch => dispatch(setHandle(handle));
