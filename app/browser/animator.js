/* NB: glossary below */


export default class Animator {
  constructor(props = null){
    this.soundLevel = null
    this.props = props
    this.intervalID = null
    this.source = null
    this.poll = this.poll.bind(this)
    this.emit = this.emit.bind(this)
    this.end = this.end.bind(this)
    this.audioCtx = new window.AudioContext()
    this.analyzer = this.audioCtx.createAnalyser()
    this.isTalking = null
  }

  setup(fftsize = 4096, smoother = 0.65, soundLevel = 100) {
    this.analyzer.fftsize = fftsize
    this.analyzer.smoothingTimeConstant = smoother
    this.soundLevel = soundLevel
    return new Promise((res) => {
      window.navigator.getUserMedia({
        audio: true
      }, (stream) => {
        res(stream)
      })
    })
      .then((stream) => {
        this.source = this.audioCtx.createMediaStreamSource(stream)
        this.source.connect(this.analyzer)
      })
      .then(() => this.poll())
  }

  poll(freq = 250) {
    this.intervalID = setInterval(() => {
      let data = new Float32Array(this.analyzer.frequencyBinCount)
      this.analyzer.getFloatFrequencyData(data)
      this.monitor(Math.abs(data.reduce((a, b) => (a + b))) / data.length)
    }, freq)
  }

  monitor(avg) {
    console.log(avg)
    if (avg < this.soundLevel) {
      this.emit(true)
    }
    else {
      this.emit(false)
    }
  }

  end() {
    clearInterval(this.intervalID)
    this.audioCtx.close()
    this.intervalID = null
    this.poll = null
  }


  emit(isTalking){
    if (this.props.webRTC){
      this.props.webRTC.sendDirectlyToAll(null, null, { animation: isTalking });
    }
  }
}

/*
GLOSSARY

analyzer: audio node responsible for monitoring amplitude

audioCtx: audio node setting context for all other nodes

clearPoll: resets this.poll() and sets this.intervalID to null

currentQuestion: stores current question immediately prior to
      asking current question. then resets back to null immediately
      after asking question. used to control flow in this.pause,
      this.next, etc.

emit: event emitter to control mouth animation

end(): kills the bot, closes the audio context

fftsize: "fast fourier transform" samples per channel.
      should be > 2048 and exponent of 2

freq: period (in ms) between calls to analyzer to poll
      amplitude. should be <200

intervalID: captures setInterval ID for poller so that
      process can be interrupted later

isTalking: Boolean indicating if user is talking. used
      to control mouth animation

monitor(avg): receives average amplitude ({avg}) from poll(),
      and reacts appropriately (incrementing waitCount if
      soundLevel met, etc)

poll(): once called, recurring function that takes average
      amplitude of all samples across channels and sends
      average to monitor(). stores this.intervalID for pausing/
      ending events

setup(): sets starting values, turns on microphone

smoother: value between 0 and 1 that "smooths out" polled
      amplitude values from poll to poll. 0.65 seems optimal
      for this use case; 0.8 is default.

soundLevel: relative amplitude threshold distinguishing
      silence from talking. VERY PICKY. optimal value varies,
      but should probably be between 90 and 110

source: audio node capturing media stream

 */
