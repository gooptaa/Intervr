# InterVR

## Resume Version:

### Deployed version: (https://intervr.herokuapp.com/)

InterVR is a virtual reality app for rehearsing and conducting interviews. In the rehearsal room, an automated bot prompts the user with generic interview questions in a random order and paces those questions by monitoring user input for silence. Afterwards, the user can download a recording of their performance. In the live room, users can see, hear, and interact with each other in the immersive context of virtual reality.

This app is written in JavaScript and relies on the following libraries/APIs:
* Node.js
* Express.js
* PostgreSQL
* Sequelize
* SimpleWebRTC
* A-Frame
* Web Audio API
* Speech Synthesis API
* MediaStream Recording API
* React
* React-Redux

### Getting Started

Upon entering the app, you will be prompted to provide a username and peer room (both optional). If you do not provide a username, you will be given a random username. If you do not provide a peer room, you will enter a random empty peer room.

If you want to meet another user in the peer room, both users should 1) use the same browser (currently only Chrome and Firefox supported) and 2) input the same peer room into the login page.

### What will I find in the code?

Lots of cool stuff!
* If you're interested in building virtual reality spaces using A-Frame, check out app/browser/room.js and app/browser/bot-room.js
* If you're interested in using WebRTC to connect users in VR, check out app/webrtc
* If you're interested in monitoring a user's microphone for amplitude, check out app/bot/bot.js. Note that this page has its own glossary.
* If you're interested in animating visual cues based on audio input, check out app/browser/animator.js. Note that this page also its own glossary.
* And if you're interested in binding all of the above with React and React-Redux... you'll have to look at everything.

### Will My Web Browser Support My VR Headset?

Maybe.

### Thanks!
