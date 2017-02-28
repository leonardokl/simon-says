import React, {PropTypes} from 'react'
import cn from 'classnames'

const Icon = ({ color, name, inverted, circular, link, onClick }) => (
  <i
    className={cn(`icon ${name}`, { [color]: color, inverted, circular, link })}
    onClick={onClick}
  />
)

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  inverted: PropTypes.bool,
  circular: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func
}

Icon.defaultProps = {
  onClick: () => 1
}

export default Icon
