import React, {PropTypes} from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '10px',
    position: 'absolute',
    flexDirection: 'column'
  }
}

const AppWrapper = ({ children }) => (
  <div style={styles.wrapper}>
    {children}
  </div>
)

AppWrapper.propTypes = {
  children: PropTypes.any
}

export default AppWrapper
