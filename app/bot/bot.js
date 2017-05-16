import Speaker from './web-speech';


/* NB: glossary below */

export default class Bot {
  constructor(interviewee = '', doc = null) {
    this.soundLevel = null
    this.document = doc
    this.threshold = null
    this.intervalID = null
    this.source = null
    this.recorderNode = null
    this.isRunning = true;
    this.record = []
    this.questions = {}
    this.currentQuestion = null
    this.waitCount = 0
    this.questionsAsked = 0
    this.audioCtx = new window.AudioContext()
    this.analyzer = this.audioCtx.createAnalyser()
    this.dest = this.audioCtx.createMediaStreamDestination()
    this.interviewee = interviewee
    this.Speaker = new Speaker()
    this.utterances = {
      first: `Great, let's begin. `,
      intro: `Great. `,
      general: `Great. `,
    }
  }

  setup = (questions, fftsize = 4096, smoother = 0.65, soundLevel = 100, threshold = 30) => {
    this.questions = questions
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
        this.analyzer.connect(this.dest)
        this.recorderNode = new MediaRecorder(this.dest.stream)
        this.recorderNode.ondataavailable = (e) => this.record.push(e.data)
      })
      .then(() => {
        setTimeout(() => { this.next(`greet`) }, 3000)
      })
  }

  getNextType = () => {
    switch (true) {
      case this.questionsAsked === 0:
        // this.recorderNode.start()
        return `first`
      case this.questionsAsked === 1:
        return `intro`
      case this.questionsAsked < 6:
        return `general`
      default:
        return `last`
    }
  }

  getQuestion = (type) => {
    if (type === `first`) { type = `intro` }
    let randomInd = Math.floor(Math.random() * this.questions[type].length)
    let question = this.questions[type].splice(randomInd, 1)
    question = question[0].text
    return question
  }


  askQuestion = (type, question = '') => {
    this.currentQuestion = question
    this.emit('talking')
    return new Promise( (res) => {
      this.Speaker.on(`${this.utterances[type]} ${question}`, res)
    }).then( () => {
      this.currentQuestion = null
      this.emit('notTalking')
      this.poll()
    })
  }

  next = (type) => {
    this.isRunning = true
    this.Speaker.cancel()
    if (this.intervalID) {
      this.clearPoll()
    }
    if (type === `greet`){
      this.emit('talking')
      this.currentQuestion = `Welcome, ${this.interviewee}! When you're ready to begin the interview, please press the start button.`
      return new Promise ( (res) => {
        this.Speaker.on(`Welcome, ${this.interviewee}! When you're ready to begin the interview, please press the start button.`, res)
      }).then( () => {
        this.emit('notTalking')
        this.currentQuestion = null
      })
    }
    else if (type === `last`){
      this.emit('talking')
      this.currentQuestion = 'Great. That concludes the interview. Feel free to exit and reenter the app to practice some more.'
      return new Promise( (res) => {
        this.Speaker.on('Great. That concludes the interview. Feel free to exit and reenter the app to practice some more.', res)
      }).then( () => this.emit('notTalking'))
        .then( () => {
          // this.recorderNode.stop()
          let buff = new Blob(this.record, {type: 'audio/webm'})
          let audioURL = window.URL.createObjectURL(buff)
          let demo = document.createElement('demo');
          document.body.appendChild(demo);
          demo.style = 'display: none';
          demo.href = audioURL;
          demo.download = 'demo.wav';
          demo.click();
          this.currentQuestion = null
          this.end()
        })
    }
    else {
      let question = this.getQuestion(type)
      this.questionsAsked++
      return this.askQuestion(type, question)
    }
  }

  poll = (freq = 100) => {
    this.intervalID = setInterval(() => {
      let data = new Float32Array(this.analyzer.frequencyBinCount)
      this.analyzer.getFloatFrequencyData(data)
      this.monitor(Math.abs(data.reduce((a, b) => (a + b))) / data.length)
    }, freq)
  }

  monitor = (avg) => {
    console.log(avg)
    if (this.waitCount > this.threshold) {
      this.clearPoll()
      this.waitCount = 0
      this.next(this.getNextType())
    }
    else if (avg > this.soundLevel) {
      this.waitCount++
    }
    else {
      this.waitCount = 0
    }
  }

  pause = () => {
    if (this.isRunning) {
      if (this.currentQuestion) {
        this.emit('notTalking')
        this.Speaker.cancel()
      }
      this.isRunning = false
      this.clearPoll()
    }
    else {
      if (this.currentQuestion){
        this.emit('talking')
        this.askQuestion('general', this.currentQuestion)
        this.isRunning = true
      }
      else {
        this.isRunning = true
        this.poll()
      }
    }
  }

  end = () => {
    this.Speaker.cancel()
    this.clearPoll()
    this.audioCtx.close()
  }

  emit = (eventName) => {
    console.log(eventName)
    return this.document.querySelector('#boxbot').emit(eventName)
  }

  clearPoll = () => {
    clearInterval(this.intervalID)
    this.intervalID = null
  }
}

/*
GLOSSARY

analyzer: audio node responsible for monitoring amplitude

askQuestion(): sends utterance and question to Speaker, then
      asynchronously runs this.poll()

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

getNextType(): determines next question category (type) based
      on {questionsAsked} value

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

utterances: stock phrases for bot (consolidated for DRYness)

waitCount: current tally of consecutive polls above {soundLevel}

 */
