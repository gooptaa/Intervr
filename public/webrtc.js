//YP/OB: Remove if not needed.

// Create a random room if not already present in the URL.
var room = window.location.hash.substring(1);
if (!room) {
  room = window.location.hash = randomToken();
}

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}

var webrtc = new SimpleWebRTC({
  media: {audio:true, video: false},
  localVideoEl: 'local-audio',
  remoteVideosEl: 'remoteVideos',
  autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  webrtc.joinRoom(room);
});