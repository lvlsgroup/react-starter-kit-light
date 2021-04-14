import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMainNavbar } from '@client/redux/globals/globalsReducer';
import styles from './MainNavbar.scss';

function MainNavbar({ className, mainNavbar }) {
  return (
    <nav className={classNames(styles.MainNavbar, className)}>
      <h4>{mainNavbar?.title}</h4>
    </nav>
  );
}

MainNavbar.propTypes = {
  className: PropTypes.string,
  mainNavbar: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    mainNavbar: selectMainNavbar(state),
  };
}

export default connect(mapStateToProps)(MainNavbar);
