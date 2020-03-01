import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import styles from './mainNavMobile.scss';

function MainNavMobile({ isVisible, toggleMobileMenu, currentPathName }) {
  function getMenuClassNames() {
    return classNames({
      [styles.navLinks]: true,
      [styles.slideUp]: !isVisible,
      [styles.slideDown]: isVisible,
    });
  }

  function getMenuItemClassNames(path) {
    return classNames({
      [styles.menuItem]: true,
      [styles.menuItemActive]: path === currentPathName,
    });
  }

  return (
    <nav className={getMenuClassNames()}>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/')}
        to={'/'}
      >
        HOME
      </ReactRouterLink>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/about')}
        to={'/about'}
      >
        ABOUT
      </ReactRouterLink>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/services')}
        to={'/services'}
      >
        SERVICES
      </ReactRouterLink>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/clients')}
        to={'/clients'}
      >
        CLIENTS
      </ReactRouterLink>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/jobs')}
        to={'/jobs'}
      >
        JOBS
      </ReactRouterLink>
      <ReactRouterLink
        onClick={toggleMobileMenu}
        className={getMenuItemClassNames('/contact')}
        to={'/contact'}
      >
        CONTACT
      </ReactRouterLink>
    </nav>
  );
}

MainNavMobile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
  currentPathName: PropTypes.string.isRequired,
};

export default MainNavMobile;
