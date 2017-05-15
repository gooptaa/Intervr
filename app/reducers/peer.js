/*****
This will keep track of peer locations.
Peer object will contain their peerId as their key, and their position and rotation as their values.
*****/

const _ = require('lodash');

/* -------------------<   ACTIONS   >--------------------- */

const UPDATE_PEER = "UPDATE_PEER";
const DELETE_PEER = "DELETE_PEER";

/* ---------------<   ACTION CREATORS   >------------------- */

export const updatePeer = (peer) => ({peer, type: UPDATE_PEER});
export const deletePeer = (peerId) => ({peerId, type: DELETE_PEER});

/* -------------------<   REDUCERS   >--------------------- */

export default function peerReducer (state = {}, action) {
  switch(action.type){
    case UPDATE_PEER:
      return Object.assign({}, state, action.peer);
    case DELETE_PEER:
      return _.omit(state, action.peerId);
    default: return state;
  }
}

/* ------------------<   DISPATCHERS   >-------------------- */

export const updatePeerLocation = peer => dispatch => {
  dispatch(updatePeer(peer));
};