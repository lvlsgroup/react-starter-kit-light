import React from 'react';
import PropTypes from 'prop-types';
import styles from './OpacifyChildren.scss';

function OpacifyChildren({ opacity, children }) {
  return opacity ? (
    <div className={styles.overlayContainer}>
      {children}
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgb(0, 0, 0, ${opacity / 100})` }}
      />
    </div>
  ) : (
    <>{children}</>
  );
}

OpacifyChildren.propTypes = {
  opacity: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default OpacifyChildren;
