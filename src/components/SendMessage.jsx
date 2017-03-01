import React, { Component, PropTypes } from 'react'
import Recorder from 'utils/recorder'
import { blobToBase64 } from 'utils'
import { Input, Icon } from 'components'
import { blobToBase64String } from 'blob-util'

const styles = {
  input: {
    borderRadius: '500em',
    outline: 'none',
    borderColor: 'rgba(34,36,38,.15)',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 1px 0px',
    height: 54,
    fontSize: 16
  }
}

let audioContext
let recorder

class SendMessage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  startUserMedia = (stream) => {
    var input = audioContext.createMediaStreamSource(stream)

    recorder = new Recorder(input)
  }

  enableAudioContext = () => {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      window.URL = window.URL || window.webkitURL

      audioContext = new AudioContext;
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'))
    } catch (e) {
      alert('Não foi possível configurar o suporte ao audio!')
    }

    navigator.getUserMedia({audio: true}, this.startUserMedia, () => {
      console.error('Não foi possível encontrar uma entrada de audio')
    });
  }
  componentDidMount () {
    this.enableAudioContext()
  }

  get initialState () {
    return ({
      message: '',
      recording: false
    })
  }

  sendMessage = () => {
    const { message } = this.state

    if (message.trim()) {
      this.setState({message: ''}, () => {
        this.props.onSend(message)
      })
    }
  }

  handleInputChange = ({ target: { value } }) => {
    const { recording } = this.state

    if (!recording) this.setState({message: value})
  }

  handleInputKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter') this.sendMessage()
  }

  startRecording = () => {
    recorder && recorder.record()

    this.setState({ recording: true })
  }

  stopRecording = () => {
    try {
      if (recorder) {console.log('recorder', recorder)
        recorder.stop()
        recorder.exportWAV((blob) => {
          console.log('blob', blob)
          blobToBase64String(blob)
            .then(res => console.log(res))
            .then(() => recorder.clear())
        })
      }
    } catch (err) {
      console.error(err)
    }
    this.setState({ recording: false })
  }

  renderRecordingIcon = () => {
    const { recording } = this.state

    const StartRecordingIcon = (
      <Icon
        name='unmute'
        inverted
        circular
        link
        onClick={this.startRecording}
      />
    )
    const StopRecordingIcon = (
      <Icon
        name='unmute'
        color='red'
        inverted
        circular
        link
        onClick={this.stopRecording}
      />
    )

    return recording
      ? StopRecordingIcon
      : StartRecordingIcon
  }

  renderIcon = () => {
    const { message } = this.state
    const SendMessageIcon = (
      <Icon
        name='send'
        color='blue'
        inverted
        circular
        link
        onClick={this.sendMessage}
      />
    )

    return message
      ? SendMessageIcon
      : this.renderRecordingIcon()
  }

  render () {
    const { recording, message } = this.state

    return (
      <Input
        value={
          recording
            ? ''
            : message
        }
        autoFocus
        style={styles.input}
        placeholder={
          recording
            ? 'Ouvindo...'
            : 'Digite uma mensagem...'
        }
        icon={this.renderIcon()}
        onChange={this.handleInputChange}
        onKeyPress={this.handleInputKeyPress}
      />
    )
  }
}

SendMessage.propTypes = {
  onSend: PropTypes.func
}

export default SendMessage
