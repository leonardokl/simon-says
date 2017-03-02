/* global SpeechSynthesisUtterance */

const speechSynthesis = window.speechSynthesis

const synthesizeSpeech = (text, { lang = 'pt-BR' } = {}) => {
  const utterThis = new SpeechSynthesisUtterance(text)
  const voices = speechSynthesis.getVoices()
  const selectedVoice = voices.find(i => i.lang === lang)

  utterThis.voice = selectedVoice
  utterThis.pitch = 1
  utterThis.rate = 1

  speechSynthesis.speak(utterThis)
}

export default synthesizeSpeech
