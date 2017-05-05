'use strict';

/****************************************************************************
* Initial setup
****************************************************************************/

// var configuration = {
//   'iceServers': [{
//     'urls': 'stun:stun.l.google.com:19302'
//   }]
// };

var configuration = null;

grabAudio();

var audio = document.querySelector('#local-audio');
var currRoom;

// Create a random room if not already present in the URL.
var isInitiator;
var room = window.location.hash.substring(1);
if (!room) {
  room = window.location.hash = randomToken();
}


/****************************************************************************
* Signaling server
****************************************************************************/

// Connect to the signaling server
var socket = io.connect();

socket.on('ipaddr', function(ipaddr) {
  console.log('Server IP address is: ' + ipaddr);
});

socket.on('created', function(room, clientId) {
  currRoom = room;
  console.log('Created room', room, '- my client ID is', clientId);
  isInitiator = true;
});

socket.on('joined', function(room, clientId) {
  currRoom = room;
  console.log('This peer has joined room', room, 'with client ID', clientId);
  isInitiator = false;
  createPeerConnection(isInitiator, configuration);
});

socket.on('full', function(room) {
  alert('Room ' + room + ' is full. We will create a new room for you.');
  window.location.hash = '';
  window.location.reload();
});

socket.on('ready', function() {
  console.log('Socket is ready');
  createPeerConnection(isInitiator, configuration);
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('message', function(message) {
  console.log('Client received message:', message);
  signalingMessageCallback(message);
});

// Join a room
socket.emit('create or join', room);

if (location.hostname.match(/localhost|127\.0\.0/)) {
  socket.emit('ipaddr');
}

/**
* Send message to signaling server
*/
function sendMessage(message) {
  console.log('Client sending message: ', message);
  socket.emit('message', message);
}


/****************************************************************************
* User media (audio)
****************************************************************************/

function grabAudio() {
  console.log('Getting user media (audio) ...');
  navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(gotStream)
  .catch(function(e) {
    alert('getUserMedia() error: ' + e.name);
  });
}

function gotStream(stream) {
  var streamURL = window.URL.createObjectURL(stream);
  console.log('getUserMedia audio stream URL:', streamURL);
  window.stream = stream; // stream available to console
  audio.src = streamURL;
  audio.muted = true;
  audio.onloadedmetadata = function() {
    console.log('pls work');
  };
}


/****************************************************************************
* WebRTC peer connection and data channel
****************************************************************************/

var peerConn;
var dataChannel;

function signalingMessageCallback(message) {
  if (message.type === 'offer') {
    console.log('Got offer. Sending answer to peer.');
    peerConn.setRemoteDescription(new RTCSessionDescription(message), function() {},
      logError);
    peerConn.createAnswer(onLocalSessionCreated, logError);

  } else if (message.type === 'answer') {
    console.log('Got answer.');
    peerConn.setRemoteDescription(new RTCSessionDescription(message), function() {},
      logError);

  } else if (message.type === 'candidate') {
    peerConn.addIceCandidate(new RTCIceCandidate({
      candidate: message.candidate
    }));

  } else if (message === 'bye') {
// TODO: cleanup RTC connection?
}
}

function createPeerConnection(isInitiator, config) {
  console.log('Creating Peer connection as initiator?', isInitiator, 'config:', config);
  peerConn = new RTCPeerConnection(config);

  peerConn.onaddstream = function (event) {
    console.log("Received Audio feed!");
    console.log('onAddStream', event);
    const remoteAudio = document.createElement('audio');
    const bodyTag = document.getElementsByTagName('body')[0];
    bodyTag.appendChild(remoteAudio);
    remoteAudio.setAttribute('id', peerId);
    remoteAudio.setAttribute('autoplay', 'autoplay');
    remoteAudio.srcObject = event.stream;
  };

  // send any ice candidates to the other peer
  peerConn.onicecandidate = function(event) {
    console.log('icecandidate event:', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  };

  if (isInitiator) {
    peerConn.createOffer(sendOffer, logError);
  } else {
    peerConn.addStream(window.stream);
  }

}

const sendOffer = (desc) => {
  socket.emit('offer', {desc, currRoom});
}



/****************************************************************************
* Aux functions, mostly UI-related
****************************************************************************/

function show() {
  Array.prototype.forEach.call(arguments, function(elem) {
    elem.style.display = null;
  });
}

function hide() {
  Array.prototype.forEach.call(arguments, function(elem) {
    elem.style.display = 'none';
  });
}

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}

function logError(err) {
  console.log(err.toString(), err);
}
