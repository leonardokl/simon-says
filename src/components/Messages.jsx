import React, { PropTypes } from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'auto'
  }
}

const Messages = ({ children }) => (
  <div style={styles.wrapper}>
    {children}
  </div>
)

Messages.propTypes = {
  children: PropTypes.any
}

export default Messages
