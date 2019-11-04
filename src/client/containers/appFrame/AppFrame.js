import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { routeWithSubRoutes } from '@client/shared/utils/routerUtils/routerUtils';
import routes from '@client/pages/routes';
import styles from './appFrame.scss';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import MainHeader from './mainHeader/MainHeader';

const MainRouteSwitch = withRouter(() => {
  function getMainClassName() {
    return classNames({
      [styles.main]: true,
    });
  }

  return (
    <main className={getMainClassName()}>
      <Switch>
        {routes.map((route, index) => routeWithSubRoutes(route, index))}
      </Switch>
    </main>
  );
});

class AppFrame extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <div className={styles.appFrame} id="app-container">
          <MainHeader />
          <div className={styles.mainContentBelowHeader}>
            <MainRouteSwitch />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

AppFrame.propTypes = {
  location: PropTypes.object,
};

export default withRouter(AppFrame);
