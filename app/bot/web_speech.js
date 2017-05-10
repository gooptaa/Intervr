//This is using Web Speech API Speech Synthesis. It will convert the text to speech on the client's browser.

export default function speak(text){
  if (text !== ''){
    const utterThis = new SpeechSynthesisUtterance(text);
    const selectedOption = 'Alex';
    for (i = 0; i < speechSynthesis.getVoices().length ; i++) {
      if (speechSynthesis.getVoices()[i].name === selectedOption) {
        utterThis.voice = speechSynthesis.getVoices()[i];
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 1;
    speechSynthesis.speak(utterThis);
  }
}

//To get a list of voices:
export const getVoices = function() {
  const synth = window.speechSynthesis;
  console.log(synth.getVoices());
}
