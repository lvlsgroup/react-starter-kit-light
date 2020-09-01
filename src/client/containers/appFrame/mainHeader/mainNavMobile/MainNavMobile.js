import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { RoutesListing } from '@client/containers/appFrame/mainHeader/mainHeaderUtils/mainHeaderUtils';
import styles from './mainNavMobile.scss';

function MainNavMobile({ className, routes }) {
  function getMenuClassNames() {
    return classNames({
      className: className,
      [styles.navLinks]: true,
    });
  }

  return (
    <nav className={getMenuClassNames()}>
      <RoutesListing routes={routes} className={styles.routeListing} />
    </nav>
  );
}

MainNavMobile.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array,
};

export default MainNavMobile;
