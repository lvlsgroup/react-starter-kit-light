import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { RoutesListing } from '@client/containers/appFrame/mainHeader/mainHeaderUtils/mainHeaderUtils';
import styles from './mainNavDesktop.scss';

function MainNavDesktop({ className, routes }) {
  return (
    <nav className={classNames(styles.topMenuDesktop, className)}>
      <RoutesListing routes={routes} className={styles.routeListing} />
    </nav>
  );
}

MainNavDesktop.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array,
  currentPathName: PropTypes.string,
};

export default MainNavDesktop;
