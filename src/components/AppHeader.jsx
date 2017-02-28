import React, {PropTypes} from 'react'

const styles = {
  wrapper: {
    textAlign: 'center',
    marginBottom: 10
  }
}

const AppHeader = ({ title, description }) => (
  <div>
    <h1 style={styles.wrapper} className='ui header'>
      <div className='content'>
        {title}
        <div className='sub header'>
          {description}
        </div>
      </div>
    </h1>
  </div>
)

AppHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default AppHeader
