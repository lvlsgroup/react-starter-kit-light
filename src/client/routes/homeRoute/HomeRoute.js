import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useThemeStyles } from '@client/helperComponents/withThemeStyles/withThemeStyles';
import Button from '@client/atomicComponents/atoms/button/Button';
import { ROUTE_KEYS } from '@client/connectivity/routes/utilsApiRoutes';
import { copyFormatter } from '@client/shared/utils/globalProjectUtils/copyUtils/copyUtils';
import { loadRoute } from '@client/redux/routes/routesActions';
import { selectRoute } from '@client/redux/routes/routesReducer';
import styles from './HomeRoute.scss';

class HomeRoute extends React.Component {
  static loadData({ dispatch }) {
    return dispatch(loadRoute(ROUTE_KEYS.homeRoute));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    HomeRoute.loadData({ dispatch });
  }

  render() {
    const { homeRoute } = this.props;
    const theme = useThemeStyles();

    return (
      <div className={classNames(styles.HomeRoute)}>
        <section className={classNames(styles.topSection)}>
          <div className={theme.contentContainerMd}>
            <h1
              onClick={this.handleFileRemove}
              className={classNames(theme.textHeadline1)}
            >
              {homeRoute.mainTitle}
            </h1>
            <p>{copyFormatter(homeRoute.subTitle, 'Lorem')}</p>
            <Button
              className={classNames(theme.btnPrimary, theme.mgt16r)}
              label={'Primary Styles Button'}
            />
          </div>
        </section>
        <div className={classNames(theme.contentContainerMd, theme.mgt32r)}>
          <p className={classNames(theme.textBody1)}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    );
  }
}

HomeRoute.propTypes = {
  homeRoute: PropTypes.shape({
    mainTitle: PropTypes.string,
    subTitle: PropTypes.string,
  }),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    homeRoute: selectRoute(state, ROUTE_KEYS.homeRoute.reducerKey),
  };
}

export default connect(mapStateToProps)(HomeRoute);
