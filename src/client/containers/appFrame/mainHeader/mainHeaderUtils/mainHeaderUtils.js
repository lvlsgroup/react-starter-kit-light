// eslint-disable-next-line filenames/match-regex
import React from 'react';
import classNames from 'classnames';
import { matchPath, NavLink } from 'react-router-dom';
import styles from './mainHeaderUtils.scss';

const MainHeaderLink = ({ className, route }) => {
  function isTabActive(match, location) {
    return matchPath(location.pathname, route);
  }

  return (
    <li className={classNames(styles.mainHeaderLink, className)}>
      <NavLink
        className={styles.routeLink}
        activeClassName={styles.activeTab}
        to={route.metaData?.url}
        isActive={isTabActive}
      >
        <span className={classNames(styles.routeLabel)}>
          {route.metaData?.label}
        </span>
      </NavLink>
    </li>
  );
};

const RoutesListing = ({ className, routes }) => {
  return (
    <ul className={classNames(styles.routesListing, className)}>
      {routes?.map((route) => {
        return <MainHeaderLink key={route.componentPath} route={route} />;
      })}
    </ul>
  );
};

export { MainHeaderLink, RoutesListing };
