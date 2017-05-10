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

  webrtc.on('channelMessage', (peer, label, data) => {
    // run update_peer on the store with the event's message
    console.log("Message ", data, " received from ", peer);
    let newPeer = {};
    if(data.payload.position) data.payload.position.y -= 1.6;
    newPeer[peer.id] = Object.assign({}, store.getState().peer[peer.id], data.payload);
    store.dispatch(updatePeer(newPeer));
  });

  webrtc.on('videoRemoved', (video, peer) => {
    store.dispatch(deletePeer(peer.id));
    console.log('REACHED');
  });

  // webrtc.on('peer')

  return webrtc;
};
