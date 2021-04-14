import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Button.scss';

function Button({
  className,
  type = 'button',
  disabled,
  label,
  onClick,
  ...rest
}) {
  return (
    <button
      className={classNames(styles.Button, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span className={classNames()}>{label}</span>
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  startIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  endIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default Button;
