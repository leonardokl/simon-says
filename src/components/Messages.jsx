import React, { PropTypes, PureComponent } from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'auto'
  }
}

class Messages extends PureComponent {
  scrollToBottom = () => {
    const {scrollHeight, clientHeight} = this.el
    const maxScrollTop = scrollHeight - clientHeight

    this.el.scrollTop = maxScrollTop > 0
      ? maxScrollTop
      : 0
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  render () {
    const { children } = this.props

    return (
      <div ref={(el) => (this.el = el)}style={styles.wrapper}>
        {children}
      </div>
    )
  }
}

Messages.propTypes = {
  children: PropTypes.any
}

export default Messages
