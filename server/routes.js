const router = require('express').Router();
const Secrets = require('../secrets');

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var text_to_speech = new TextToSpeechV1({
  username: Secrets.watson.username,
  password: Secrets.watson.password
});

// var params = {
//   text: 'Hello from IBM Watson',
//   voice: 'en-US_AllisonVoice', // Optional voice
//   accept: 'audio/wav'
// };

// Pipe the synthesized text to a file
// text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));

router.post('/speech', (req,res,next) => {
  let params = {
    text: req.body.text,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
  text_to_speech.synthesize(params.pipe(fs.createWriteStream(path.join(__dirname, './../public/speech/output.wav')));
})
