'use strict'
const router = require('express').Router();
const Secrets = require('../secrets');
const path = require('path');
const extend = require('util')._extend;
var watson = require('watson-developer-cloud');
var fs = require('fs');


var ttsConfig = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
  username: 'dd380c04-3f49-4648-80ff-9e61c74363fb',
  password: 'TaLzAM77Ct35'
}, vcapServices.getCredentials('text_to_speech'));

var ttsAuthService = watson.authorization(ttsConfig);

var tts = watson.text_to_speech(ttsConfig);

router.get('/text-to-speech/token', function(req, res) {
  ttsAuthService.getToken({url: ttsConfig.url}, function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token')
    }
    res.send(token);
  });
});

// obviously you would need something more complex than a single global variable for production use
// but this works for a light weight proof-of-concept
var getTimings = Promise.resolve([]);

router.get('/text-to-speech/synthesize', function(req, res) {

  // create an audio stream
  var audioStream = tts.synthesize({
    text: req.query.text,
    accept: req.headers.accept // let the client's browser choose what format the audio is sent in
  });

  // send the audio stream to the speech to text service and extract word timings from the results
  // getTimings = new Promise(function(resolve, reject) {
  //   stt.recognize({
  //     audio: audioStream,
  //     timestamps: true,
  //     content_type: 'audio/ogg; codec=opus' // todo: set this pragmatically based on audio stream's content type
  //   }, function(err, data) {
  //     console.log(err, data);
  //     if (err) {
  //       return reject(err);
  //     }
  //     var wordTimings = data.results.reduce(function(prev, result) {
  //       return prev.concat(result.alternatives[0].timestamps)
  //     }, []);
  //     resolve(wordTimings);
  //   });
  // });


  // also send the audio stream to the client for playback
  audioStream.pipe(fs.createWriteStream(path.join(__dirname, '../public/speech/output.wav')))
  audioStream.pipe(res);


  // you could additionally pipe the audio to a file if you wanted to save it for later
  // audioStream.pipe(fs.createWriteStream('./my-audio-fille.{wav|ogg|flac}'));
});

router.get('/text-to-speech/word-timing', function(req, res) {
  getTimings.then(function(wordTimings) {
    res.json(wordTimings);
  }).catch(function(err) {
    res.status(500).send(err.message);
  });
});

exports.router = router;
