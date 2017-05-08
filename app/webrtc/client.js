export function generateWebRTC(room) {
  var webrtc = new SimpleWebRTC({
    media: {audio:true, video: false},
    localVideoEl: 'local-audio',
    remoteVideosEl: 'remote-videos',
    autoRequestMedia: true
  });

  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    webrtc.joinRoom(room);
  });
};
