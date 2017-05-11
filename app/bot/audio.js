import monitor from './monitor.js'

var audioCtx = new (window.AudioContext)()

var analyzer = audioCtx.createAnalyser()
analyzer.fftsize = 2048 // haven't experimented with this value much; could be increased for higher resolution
analyzer.smoothingTimeConstant = .5 // must be set to 0-1. the extremes don't work very well (defaults to 0.8)

var poller = function(milli = 200) { // milli should be <= 200)
  setInterval(function(){
    let data = new Float32Array(analyzer.frequencyBinCount)
    analyzer.getFloatFrequencyData(data)
    monitor(Math.abs(data.reduce((a, b) => (a + b))) / data.length)
  }, milli)
}

navigator.getUserMedia (
  // constraints - only audio needed for this app
  {
    audio: true
  },
  // Success callback
  function(stream) {
    var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyzer);
    analyzer.connect(audioCtx.destination); // connecting the different audio graph nodes together
  },
  // Error callback
  function(err) {
    console.log('The following gUM error occured: ' + err);
  }
)

