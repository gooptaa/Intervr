
export default class Bot {
  constructor(username = '', soundLevel = 100, threshold = 10){
    this.soundLevel = soundLevel
    this.threshold = threshold
    this.waitCount = 0
    this.audioCtx = new (window.AudioContext)()
    this.analyzer = this.audioCtx.createAnalyser()
    this.polling = false
    this.questionsAsked = 0
    this.username = username
    this.questions = {}
  }

  setup(questions, fftsize = 2048, smoother = .5){
    this.questions = questions
    this.analyzer.fftsize = fftsize
    this.analyzer.smoothingTimeConstant = smoother
    window.navigator.getUserMedia({
      audio: true
    }, (stream) => {
      const source = this.audioCtx.createMediaStreamSource(stream)
      source.connect(this.analyzer)
      this.analyzer.connect(this.audioCtx.destination)
    }, (err) => {
      console.error("Hmm, there was an issue setting up your room: ", err)
    })
    this.next()
  }

  poll(freq = 200){
    this.polling = true
    setInterval( () => {
      if (this.polling){
        let data = new Float32Array(this.analyzer.frequencyBinCount)
        this.analyzer.getFloatFrequencyData(data)
        this.monitor(Math.abs(data.reduce((a, b) => (a + b))) / data.length)
      }
    }, freq)
  }

  monitor(avg){
    if (this.waitCount > this.threshold){
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
    }
    else {
      this.poll()
    }
  }

  next(){ //introduce, ask questions, end interview
    if (this.questionsAsked === 0){
      let question = this.getQuestion(intro)
      return `Hello ${this.username}! Let's begin the interview. ${question}.`
    }
    else if (this.questionsAsked < 2){
      let question = this.getQuestion(intro)
      return `Great! ${question}`
    }
    else if (this.questionsAsked < 6){
      let question = this.getQuestion(general)
      return `Great! ${question}`
    }
    else {
      return 'Great! That concludes the interview. Feel free to exit and reenter the app to practice some more.'
    }
  }

  getQuestion(type){
    let randomInd = Math.floor(Math.random() * this.questions.type.length)
    let question = this.questions.type.splice(randomInd)
    return question
  }
}

