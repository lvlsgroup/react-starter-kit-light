import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './SnxSynthSwapHistoryRoute.scss';

class SnxSynthSwapHistoryRoute extends React.PureComponent {
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
        <h1>HISTORY</h1>
      </section>
    );
  }
}

SnxSynthSwapHistoryRoute.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default connect()(SnxSynthSwapHistoryRoute);
