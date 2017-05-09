import store from '../store';
import {updatePeer} from '../reducers/peer';

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
    newPeer[peer.id] = Object.assign({}, store.getState().peer[peer.id], data.payload)
    if(newPeer.position) newPeer.position.y -= 1.6;
    store.dispatch(updatePeer(newPeer));
  });

  return webrtc;
};
