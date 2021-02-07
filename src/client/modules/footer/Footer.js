import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFooter } from '@client/redux/globals/globalsReducer';
import styles from './Footer.scss';

function Footer({ className, footer }) {
  return (
    <footer className={classNames(styles.footer, className)}>
      <h4>{footer?.title}</h4>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  footer: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    footer: selectFooter(state),
  };
}

export default connect(mapStateToProps)(Footer);
