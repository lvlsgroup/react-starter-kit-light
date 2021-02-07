import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { ROUTE_KEYS } from '@client/connectivity/routes/utilsApiRoutes';
import { selectRoute } from '@client/redux/routes/routesReducer';
import { loadRoute } from '@client/redux/routes/routesActions';

class NotFoundRoute extends PureComponent {
  static loadData(dispatch) {
    return dispatch(loadRoute(ROUTE_KEYS.notFoundRoute));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    NotFoundRoute.loadData(dispatch);
  }

  render() {
    const { notFoundCopy } = this.props;

    return (
      <div>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>{notFoundCopy.mainTitle}</title>
        </Helmet>
        <h1>{notFoundCopy.mainTitle}</h1>
      </div>
    );
  }
}

NotFoundRoute.propTypes = {
  notFoundCopy: PropTypes.shape({
    mainTitle: PropTypes.string,
  }),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    homeRoute: selectRoute(state, ROUTE_KEYS.notFoundRoute.reducerKey),
  };
}

export default connect(mapStateToProps)(NotFoundRoute);
