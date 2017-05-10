'use strict';
var synthesize = require('watson-speech/text-to-speech/synthesize');
var recognizeElement = require('watson-speech/speech-to-text/recognize-element');

module.exports = function (text, target) {

    // note: you could preload the tokens for slightly reduced latency. Just be aware that they expire after an hour.
        // in parallel, fetch a TTS token
        fetch('/api/text-to-speech/token')
        .then(function(response) {
            return response.text();
        })
      .then(function (token) {

        var audioElement = synthesize({
            text: text,
            token: token,
            autoPlay: false // recognizeElement will automatically play it when ready
        });

    }).catch(function(err) {
        console.log(err);
    });
};
