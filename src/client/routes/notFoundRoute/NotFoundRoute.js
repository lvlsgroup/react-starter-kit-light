import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTE_KEYS } from '@client/connectivity/routes/utilsApiRoutes';
import { selectRoute } from '@client/redux/routes/routesReducer';
import { loadRoute } from '@client/redux/routes/routesActions';
import { selectGlobals } from '@client/redux/globals/globalsReducer';
import MetaTags from '@client/modules/metaTags/MetaTags';
import styles from './NotFoundRoute.scss';

class NotFoundRoute extends PureComponent {
  static loadData({ dispatch }) {
    return dispatch(loadRoute(ROUTE_KEYS.notFoundRoute));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    NotFoundRoute.loadData({ dispatch });
  }

  render() {
    const { notFoundRoute } = this.props;

    return (
      <div className={styles.NotFoundPage}>
        <MetaTags metaTags={notFoundRoute?.metaTags} />
        <h1>{notFoundRoute.mainTitle}</h1>
      </div>
    );
  }
}

NotFoundRoute.propTypes = {
  notFoundRoute: PropTypes.shape({
    mainTitle: PropTypes.string,
    metaTags: PropTypes.array,
  }),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    notFoundRoute: selectRoute(state, ROUTE_KEYS.notFoundRoute.reducerKey),
  };
}

export default connect(mapStateToProps)(NotFoundRoute);
