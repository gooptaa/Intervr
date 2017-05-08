/*****
This will keep track of peer locations.
Peer object will contain their sdp as their id, and their position and rotation as their values.
*****/

const _ = require('lodash');

const UPDATE_PEER = "UPDATE_PEER";
const DELETE_PEER = "DELETE_PEER";

const updatePeer = (peer) => {peer, type: UPDATE_PEER};
const deletePeer = (peerId) => {peerId, type: DELETE_PEER}

export default function peerReducer (state = {}, action) {
  switch(action.type){
    case UPDATE_PEER:
      return Object.assign({}, state, action.peer);
    case DELETE_PEER:
      return _.omit(state, action.peerId);
    default: return state;
  }
  return state;
}

