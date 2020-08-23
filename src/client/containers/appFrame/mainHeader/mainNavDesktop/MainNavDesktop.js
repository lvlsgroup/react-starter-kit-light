import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ALL_ROUTES from '@client/pages/routes';
import styles from './mainNavDesktop.scss';

function MainNavDesktop({ className, currentPathName }) {
  const mainRoutes = Object.values(ALL_ROUTES);

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
  function isActiveOrDefaultFundraiser(currentPathname, match, location) {
    console.log('currentPathname', currentPathname);
    console.log('match', match);
    console.log('location', location);

    const isBasePath = location.pathname.startsWith(currentPathname);
    if (isBasePath && currentPathname !== '/') {
      return true;
    } else if (match && location.pathname === '/') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <ul className={classNames(className)}>
      {routes &&
        routes.map((route) => {
          return (
            <NavLink
              key={route.TO + route.LABEL}
              className={styles.routeLink}
              activeClassName={styles.activeTab}
              isActive={(match, location) =>
                isActiveOrDefaultFundraiser(route.TO, match, location)
              }
              to={route.TO}
            >
              <li className={styles.listItem}>
                <span className={styles.routeLabel}>{route.LABEL}</span>
              </li>
            </NavLink>
          );
        })}
    </ul>
  );
};
