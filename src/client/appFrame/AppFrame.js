import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { routeWithSubRoutes } from '@lvlsgroup/react-component-lib/src/client/shared/utils/routerUtils/routerUtils';
import { getRouteValues } from '@client/routes/mainRoutesUtils';
import {
  loadGlobals,
  setLanguageCode,
} from '@client/redux/globals/globalsActions';
import Footer from '@client/modules/footer/Footer';
import MainNavbar from '@client/modules/mainNavbar/MainNavbar';
import MetaTags from '@client/modules/metaTags/MetaTags';
import ErrorBoundary from '@client/helperComponents/errorBoundary/ErrorBoundary';
import { selectGlobals } from '@client/redux/globals/globalsReducer';
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
  static loadData({ dispatch, languageCode }) {
    return Promise.all([dispatch(setLanguageCode(languageCode))]).then(() => {
      return dispatch(loadGlobals());
    });
  }

  render() {
    const { globals } = this.props;

    return (
      <ErrorBoundary>
        <div className={styles.appFrame} id="app-container">
          <MetaTags metaTags={globals?.metaTags} />
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
  globals: PropTypes.shape({
    metaTags: PropTypes.array,
  }),
};

function mapStateToProps(state) {
  return {
    globals: selectGlobals(state),
  };
}

export default connect(mapStateToProps)(withRouter(AppFrame));
