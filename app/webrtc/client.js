import store from '../store';
import {updatePeer, deletePeer} from '../reducers/peer';

export function generateWebRTC(room) {
  var webrtc = new SimpleWebRTC({
    media: {audio:true, video: false},
    localVideoEl: 'local-audio',
    remoteVideosEl: 'remote-videos',
    autoRequestMedia: true
  });

  // we have to wait until it's ready
  webrtc.on('readyToCall', () => {
    webrtc.joinRoom(room);
  });

  // channel messages are used for sending peer locations
  webrtc.on('channelMessage', (peer, label, data) => {
    // console.log("Message ", data, " received from ", peer);
    let newPeer = {};
    if(data.payload.position) {
      data.payload.position.x += 2;
      data.payload.position.y += -2.5;
      data.payload.position.z += -5;
    }
    newPeer[peer.id] = Object.assign({}, store.getState().peer[peer.id], data.payload);
    store.dispatch(updatePeer(newPeer));
  });

  // remove the model when user disconnects
  webrtc.on('videoRemoved', (video, peer) => {
    store.dispatch(deletePeer(peer.id));
  });

  // when datachannel opens, send each other's locations
  webrtc.on('channelOpen', peer => {
    webrtc.sendDirectlyToAll(null, null, {position: store.getState().camera.position});
    webrtc.sendDirectlyToAll(null, null, {rotation: store.getState().camera.rotation});
    webrtc.sendDirectlyToAll(null, null, {handle: store.getState().self.handle});
  });

  return webrtc;
};
