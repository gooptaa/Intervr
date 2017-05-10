const router = require('express').Router();
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');
const path = require('path')

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});



var watson = require('watson-developer-cloud');

var authorization = new watson.AuthorizationV1({
  username: 'dd380c04-3f49-4648-80ff-9e61c74363fb',
  password: 'TaLzAM77Ct35',
  url: watson.TextToSpeechV1.URL
});

authorization.getToken(function (err, token) {
  if (!token) {
    console.log('error:', err);
  } else {
    var params = {
    text: 'Hello from IBM Watson',
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav',
    token: token,
};
    text_to_speech.synthesize(params).pipe(fs.createWriteStream(path.join(__dirname, '../../public/speech/output.wav')));
  }
});


var text_to_speech = new TextToSpeechV1({
  username: 'dd380c04-3f49-4648-80ff-9e61c74363fb',
  password: 'TaLzAM77Ct35'
});

var params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file
// text_to_speech.synthesize(params).pipe(fs.createWriteStream(path.join(__dirname, '../../public/speech/output.wav')));

module.exports = router;
