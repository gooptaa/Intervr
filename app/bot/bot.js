import Speak from './web-speech';

export default class Bot {
  constructor(username = '', soundLevel = 100, threshold = 15){
    this.soundLevel = soundLevel
    this.threshold = threshold
    this.waitCount = 0
    this.audioCtx = new (window.AudioContext)()
    this.analyzer = this.audioCtx.createAnalyser()
    this.polling = false
    this.questionsAsked = 0
    this.username = username
    this.questions = {}
    this.intervalID = null
  }

  setup(questions, fftsize = 2048, smoother = 0.8){
    this.questions = questions
    this.analyzer.fftsize = fftsize
    this.analyzer.smoothingTimeConstant = smoother
    window.navigator.getUserMedia({
      audio: true
    }, (stream) => {
      const source = this.audioCtx.createMediaStreamSource(stream)
      source.connect(this.analyzer)
      // this.analyzer.connect(this.audioCtx.destination)
    }, (err) => {
      console.error("Hmm, there was an issue setting up your room: ", err)
    })
    setTimeout(this.next(), 5000)
  }

  poll(freq = 200){
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

  next(){ //introduce, ask questions, end interview
    if (this.questionsAsked === 0){
      let question = this.getQuestion('intro')
      Speak(`Hello ${this.username}! Let's begin the interview. ${question}.`)
      this.questionsAsked++
      this.poll()
    }
    else if (this.questionsAsked < 2){
      let question = this.getQuestion('intro')
      Speak(`Great! ${question}`)
      this.questionsAsked++
      this.poll()
    }
    else if (this.questionsAsked < 6){
      let question = this.getQuestion('general')
      Speak(`Great! ${question}`)
      this.questionsAsked++
      this.poll()
    }
    else {
      Speak('Great! That concludes the interview. Feel free to exit and reenter the app to practice some more.')
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
  }
}

