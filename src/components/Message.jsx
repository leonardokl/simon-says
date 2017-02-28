import React, {PropTypes} from 'react'

const styles = {
  wrapper: {
    borderRadius: '1.3em',
    color: 'white',
    marginBottom: 5,
    padding: '5px 10px'
  }
}

const Message = ({ text, alignSelf, backgroundColor }) => (
  <div style={{...styles.wrapper, alignSelf, backgroundColor}}>
    <p>{text}</p>
  </div>
)

Message.propTypes = {
  backgroundColor: PropTypes.string,
  alignSelf: PropTypes.string,
  text: PropTypes.string
}

Message.defaultProps = {
  backgroundColor: '#2185D0',
  alignSelf: 'flex-start'
}

export default Message
