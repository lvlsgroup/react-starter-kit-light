import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Label.scss';

const Label = React.memo(({ className }) => {
  return <label htmlFor="">HEl</label>;
});

const INPUT_SIZE = ['inputSizeMd', 'inputSizeMdL', 'inputSizeLg'];

Label.propTypes = {
  className: PropTypes.string,
  inputSize: PropTypes.oneOf(INPUT_SIZE),
};

export default Label;
