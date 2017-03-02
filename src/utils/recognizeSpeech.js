/* global webkitSpeechRecognition */

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

const recognizeSpeech = () => new Promise((resolve, reject) => {
  const recognition = new SpeechRecognition()
  recognition.lang = 'pt-BR'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.start()

  recognition.onresult = (event) => {
    const { transcript, confidence } = event.results[0][0]

    resolve({ transcript, confidence })
  }

  recognition.onspeechend = () => {
    recognition.stop()
  }

  recognition.onerror = (event) => {
    reject(event.error)
  }
})

export default recognizeSpeech
