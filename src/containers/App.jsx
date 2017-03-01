import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { AppWrapper, AppHeader, Messages, Message, SendMessage } from 'components'
import { getMessages } from 'store/selectors'
import * as actions from 'store/actions'

class App extends PureComponent {
  componentDidMount () {
    this.props.onDidMount()
  }

  render () {
    const { messages, onSendMessage } = this.props

    return (
      <AppWrapper>
        <AppHeader
          title='Simon Says'
          description='Sou uma inteligência artificial'
        />
        <Messages>
          {messages.map((message, index) =>
            <Message
              key={index}
              alignSelf={
                message.bot
                  ? 'flex-start'
                  : 'flex-end'
              }
              backgroundColor={
                message.bot
                  ? '#00b5ad'
                  : '#2185D0'
              }
              text={message.text}
            />
          )}
        </Messages>
        <SendMessage
          onSend={text => onSendMessage({ text })}
        />
      </AppWrapper>
    )
  }
}

App.propTypes = {
  messages: PropTypes.array,
  onDidMount: PropTypes.func,
  onSendMessage: PropTypes.func
}

const mapStateToProps = state => ({
  messages: getMessages(state)
})

const mapDispatchToProps = ({
  onDidMount: actions.init,
  onSendMessage: actions.sendMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
