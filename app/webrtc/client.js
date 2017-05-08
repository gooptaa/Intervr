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
  })
};
