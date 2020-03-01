import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ReactLink from '@lvlsgroup/react-component-lib/src/client/components/links/reactLink/ReactLink';
import { getMainRoutes } from '@client/pages/routes';
import styles from './mainNavDesktop.scss';

function MainNavDesktop({ className, currentPathName }) {
  const mainRoutes = Object.values(getMainRoutes());

  return (
    <nav
      className={`${styles.topMenuDesktop}${className ? ` ${className}` : ''}`}
    >
      <RoutesListing routes={mainRoutes} className={styles.routeListing} />
    </nav>
  );
}

MainNavDesktop.propTypes = {
  className: PropTypes.string,
  currentPathName: PropTypes.string,
};

export default MainNavDesktop;

const RoutesListing = ({ className, routes }) => {
  return (
    <ul className={classNames(className)}>
      {routes &&
        routes.map((route) => {
          return (
            <ReactLink
              key={route.TO + route.LABEL}
              className={styles.routeLink}
              to={route.TO}
            >
              <li className={styles.listItem}>
                <span className={styles.routeLabel}>{route.LABEL}</span>
              </li>
            </ReactLink>
          );
        })}
    </ul>
  );
};
