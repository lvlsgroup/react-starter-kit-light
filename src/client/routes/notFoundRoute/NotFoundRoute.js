import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { ROUTE_KEYS } from '@client/connectivity/routes/utilsApiRoutes';
import { selectRoute } from '@client/redux/routes/routesReducer';
import { loadRoute } from '@client/redux/routes/routesActions';
import { selectGlobals } from '@client/redux/globals/globalsReducer';

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
      <div>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>{notFoundRoute.mainTitle}</title>
        </Helmet>
        <h1>{notFoundRoute.mainTitle}</h1>
      </div>
    );
  }
}

NotFoundRoute.propTypes = {
  notFoundRoute: PropTypes.shape({
    mainTitle: PropTypes.string,
  }),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    notFoundRoute: selectRoute(state, ROUTE_KEYS.notFoundRoute.reducerKey),
    globals: selectGlobals(state),
  };
}

export default connect(mapStateToProps)(NotFoundRoute);
