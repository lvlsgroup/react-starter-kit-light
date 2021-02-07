import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { routeWithSubRoutes } from '@lvlsgroup/react-component-lib/src/client/shared/utils/routerUtils/routerUtils';
import { getRouteValues } from '@client/routes/mainRoutesUtils';
import { loadGlobals } from '@client/redux/globals/globalsActions';
import Footer from '@client/modules/footer/Footer';
import MainNavbar from '@client/modules/mainNavbar/MainNavbar';
import ErrorBoundary from '../helperComponents/errorBoundary/ErrorBoundary';
import styles from './appFrame.scss';

const MainRouteSwitch = withRouter(() => {
  function getMainClassName() {
    return classNames({
      [styles.main]: true,
    });
  }

  return (
    <main className={getMainClassName()}>
      <Switch>
        {getRouteValues().map((route, index) =>
          routeWithSubRoutes(route, index)
        )}
      </Switch>
    </main>
  );
});

class AppFrame extends React.PureComponent {
  static loadData(dispatch) {
    return dispatch(loadGlobals());
  }

  render() {
    return (
      <ErrorBoundary>
        <div className={styles.appFrame} id="app-container">
          <MainNavbar className={styles.mainNavbarProp} />
          <MainRouteSwitch />
          <Footer className={styles.footerProp} />
        </div>
      </ErrorBoundary>
    );
  }
}

AppFrame.propTypes = {
  location: PropTypes.object,
};

export default withRouter(AppFrame);
