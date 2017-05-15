//This is using Web Speech API Speech Synthesis. It will convert the text to speech on the client's browser.

export default class Speak {
  constructor(){
    this.utterThis = null;
    this.selectedOption = 'Alex';
  }
//this will invoke the speak function from speech synthesis
  on(text, cb){
    this.utterThis = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < speechSynthesis.getVoices().length ; i++) {
      if (speechSynthesis.getVoices()[i].name === this.selectedOption) {
        this.utterThis.voice = speechSynthesis.getVoices()[i];
      }
    }
    this.utterThis.pitch = 1;
    this.utterThis.rate = 1;
    this.utterThis.onend = cb
    speechSynthesis.speak(this.utterThis);
  }

//this will cancel the speak function from speech synthesis
  cancel(){
    if(this.utterThis) {
      speechSynthesis.cancel(this.utterThis)
      this.utterThis = null
    }
  }
//this will pause the speak function
  pause(){
      speechSynthesis.pause()
  }
//this will resume the speak function
   resume(){
      speechSynthesis.resume()
  }

//this will get the voices that are available and console.log it.
  getVoices(){
    const synth = window.speechSynthesis;
    console.log(synth.getVoices());
  }
}
