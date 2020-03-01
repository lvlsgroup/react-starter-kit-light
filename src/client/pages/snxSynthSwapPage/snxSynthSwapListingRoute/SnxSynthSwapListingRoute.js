import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './snxSynthSwapListingRoute.scss';

class SnxSynthSwapListingRoute extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static loadData() {
    console.log('SnxSynthSwapHistoryRoute loadData');
    return () => {};
  }

  render() {
    const { dispatch, location, history, accessToken } = this.props;
    return (
      <section
        className={classNames(
          styles.snxSynthSwapListingRoute,
          styleHelper.pageWidthAndCentralizer
        )}
      >
        <h1>LISTING</h1>
      </section>
    );
  }
}

SnxSynthSwapListingRoute.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default connect()(SnxSynthSwapListingRoute);
