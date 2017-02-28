import React, {PropTypes} from 'react'
import cn from 'classnames'
import Icon from './Icon'

const renderIcon = (icon) => typeof icon === 'string'
  ? <Icon name={icon} />
  : icon

const Input = ({
  autoFocus,
  placeholder,
  icon,
  style,
  value,
  onChange,
  onKeyPress
}) => (
  <div style={{marginTop: 10}} className={cn('ui input', { icon })}>
    <input
      style={style}
      type='text'
      value={value}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
    {!!icon && renderIcon(icon)}
  </div>
)

Input.propTypes = {
  autoFocus: PropTypes.bool,
  icon: PropTypes.any,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

Input.defaultProps = {
  style: {}
}

export default Input

