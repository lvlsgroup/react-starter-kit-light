import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { matchPath, NavLink } from 'react-router-dom';
import { getMainNavRoutes } from '@client/pages/routes';
import styles from './mainNavDesktop.scss';

function MainNavDesktop({ className, currentPathName }) {
  return (
    <nav
      className={`${styles.topMenuDesktop}${className ? ` ${className}` : ''}`}
    >
      <RoutesListing
        routes={getMainNavRoutes()}
        className={styles.routeListing}
      />
    </nav>
  );
}

MainNavDesktop.propTypes = {
  className: PropTypes.string,
  currentPathName: PropTypes.string,
};

export default MainNavDesktop;

const RoutesListing = ({ className, routes }) => {
  function isTabActive(match, location, route) {
    return matchPath(location?.pathname, route);
  }

  return (
    <ul className={classNames(className)}>
      {routes &&
        routes.map((route) => {
          return (
            <li key={route.componentPath} className={styles.listItem}>
              <NavLink
                className={styles.routeLink}
                activeClassName={styles.activeTab}
                isActive={(match, location) =>
                  isTabActive(match, location, route)
                }
                to={route.metaData?.url}
              >
                <span className={styles.routeLabel}>{route.LABEL}</span>
              </NavLink>
            </li>
          );
        })}
    </ul>
  );
};
