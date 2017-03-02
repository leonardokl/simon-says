/* globals Blob, MediaRecorder */

import React, { Component, PropTypes } from 'react'
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

let mediaStream
let mediaRecorder
let chunks = []

class SendMessage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState
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
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        mediaStream = stream
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.start()
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }

        this.setState({ recording: true })
      })
      .catch((err) => console.error(err))
  }

  stopRecording = () => {
    mediaRecorder.stop()
    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' })
    const [audioStream] = mediaStream.getAudioTracks()

    chunks = []

    audioStream.stop()

    blobToBase64String(blob)
      .then((res) => console.log('BASE 64: ', res))

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
