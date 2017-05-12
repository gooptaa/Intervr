import Speak from './web-speech';

/* NB: glossary below */

export default class Bot {
  constructor(interviewee = ''){
    this.soundLevel = null
    this.threshold = null
    this.waitCount = 0
    this.audioCtx = new (window.AudioContext)()
    this.analyzer = this.audioCtx.createAnalyser()
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
    setTimeout(this.next("greet"), 5000)
  }

  poll(freq = 100){
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
      clearInterval(this.intervalID)
      this.intervalID = null
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
    if (this.intervalID){
      clearInterval(this.intervalID)
      this.intervalID = null
    }
    else {
      this.poll()
    }
  }

  next(type){
    if (type === "greet"){
      this.Speaker.on(`Welcome, ${this.interviewee}! When you're ready to begin the interview, please press the start button.`)
    }
    else if (this.questionsAsked === 0){
      let question = this.getQuestion('intro')
      this.Speaker.on(`Great, let's begin. ${question}.`)
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
    this.intervalID = null
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

end(): kills the bot, closes the audio context, and interrupts
      any queued utterances

fftsize: "fast fourier transform" samples per channel.
      should be > 2048 and exponent of 2

freq: period (in ms) between calls to analyzer to poll
      amplitude. should be <200

getQuestion(type): draws a question of type {type} at random,
      removes that question from local state, and returns that
      question (usually to next())

intervalID: captures setInterval ID for poller so that
      process can be interrupted later

monitor(avg): receives average amplitude ({avg}) from poll(),
      and reacts appropriately (incrementing waitCount if
      soundLevel met, etc)

next(): triggers a question event based on current conditions

pause(): pauses the bot

poll(): once called, recurring function that takes average
      amplitude of all samples across channels and sends
      average to monitor(). stores this.intervalID for pausing/
      ending events

questions: local store (passed from redux props) with
      interview questions of following format:
      Obj{ arr[ {text: }, etc], etc}

questionsAsked: running tally of questions asked

setup(): sets starting values, turns on microphone, and triggers intro

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
