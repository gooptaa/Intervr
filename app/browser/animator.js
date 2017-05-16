export default class Animator {
  constructor(props = null){
    this.soundLevel = null
    this.props = props
    this.threshold = null
    this.intervalID = null
    this.source = null
    this.poll = this.poll.bind(this)
    this.emit = this.emit.bind(this)
    this.end = this.end.bind(this)
    this.audioCtx = new window.AudioContext()
    this.analyzer = this.audioCtx.createAnalyser()
    this.isTalking = null
  }

  setup(fftsize = 4096, smoother = 0.65, soundLevel = 100, threshold = 30) {
    this.analyzer.fftsize = fftsize
    this.analyzer.smoothingTimeConstant = smoother
    this.soundLevel = soundLevel
    this.threshold = threshold
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
