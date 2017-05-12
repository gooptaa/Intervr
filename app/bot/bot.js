import Speak from './web-speech';

/* NB: glossary below */

export default class Bot {
  constructor(interviewee = ''){
    this.soundLevel = null
    this.threshold = null
    this.waitCount = 0
    this.audioCtx = new (window.AudioContext)()
    this.analyzer = this.audioCtx.createAnalyser()
    this.polling = false
    this.questionsAsked = 0
    this.interviewee = interviewee
    this.questions = {}
    this.intervalID = null
    this.source = null
    this.Speaker = new Speak()
  }

  setup(questions, fftsize = 4096, smoother = 0.65, soundLevel = 100, threshold = 30){
    this.questions = questions
    this.analyzer.fftsize = fftsize
    this.analyzer.smoothingTimeConstant = smoother
    this.soundLevel = soundLevel
    this.threshold = threshold
    window.navigator.getUserMedia({
      audio: true
    }, (stream) => {
      this.source = this.audioCtx.createMediaStreamSource(stream)
      this.source.connect(this.analyzer)
    }, (err) => {
      console.error("Hmm, there was an issue setting up your room: ", err)
    })
    setTimeout(this.next(), 5000)
  }

  poll(freq = 100){
    this.polling = true
    this.intervalID = setInterval( () => {
        let data = new Float32Array(this.analyzer.frequencyBinCount)
        this.analyzer.getFloatFrequencyData(data)
        this.monitor(Math.abs(data.reduce((a, b) => (a + b))) / data.length)
    }, freq)
  }

  monitor(avg){
    console.log(avg)
    if (this.waitCount > this.threshold){
      this.waitCount = 0
      this.polling = false
      clearInterval(this.intervalID)
      this.next()
    }
    else if (avg > this.soundLevel){
      this.waitCount++
    }
    else {
      this.waitCount = 0
    }
  }

  pause(){
    if (this.polling){
      this.polling = false
      clearInterval(this.intervalID)
    }
    else {
      this.poll()
    }
  }

  next(){
    if (this.questionsAsked === 0){
      let question = this.getQuestion('intro')
      this.Speaker.on(`Hello ${this.interviewee}! Let's begin the interview. ${question}.`)
      this.questionsAsked++
      this.poll()
    }
    else if (this.questionsAsked < 2){
      let question = this.getQuestion('intro')
      this.Speaker.on(`Great! ${question}`)
      this.questionsAsked++
      this.poll()
    }
    else if (this.questionsAsked < 6){
      let question = this.getQuestion('general')
      this.Speaker.on(`Great! ${question}`)
      this.questionsAsked++
      this.poll()
    }
    else {
      this.Speaker.on('Great! That concludes the interview. Feel free to exit and reenter the app to practice some more.')
    }
  }

  getQuestion(type){
    let randomInd = Math.floor(Math.random() * this.questions[type].length)
    let question = this.questions[type].splice(randomInd, 1)
    question = question[0].text
    return question
  }

  end(){
    clearInterval(this.intervalID)
    this.poll = null
    this.next = null
    this.getQuestion = null
    this.source = null
    this.Speaker.cancel()
    this.audioCtx.close()
  }
}

/*
GLOSSARY

analyzer: audio node responsible for monitoring amplitude

audioCtx: audio node setting context for all other nodes

fftsize: "fast fourier transform" samples per channel.
      should be > 2048 and exponent of 2

freq: period (in ms) between calls to analyzer to poll
      amplitude. should be <200

intervalID: captures setInterval ID for poller so that
      process can be interrupted later

polling: boolean indicating whether bot is actively
      polling

questions: local store (passed from redux props) with
      interview questions of following format:
      Obj{ arr[ {text: }, etc], etc}

questionsAsked: running tally of questions asked

smoother: value between 0 and 1 that "smooths out" polled
      amplitude values from poll to poll. 0.65 seems optimal
      for this use case; 0.8 is default.

soundLevel: relative amplitude threshold distinguishing
      silence from talking. VERY PICKY. optimal value varies,
      but should probably be between 90 and 110

source: audio node capturing media stream

Speaker: TTS constructor with on(text) and pause() methods

threshold: number of consecutive polls above {soundLevel} at {freq}

waitCount: current tally of consecutive polls above {soundLevel}

 */
