import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Flex from '@lvlsgroup/react-component-lib/src/client/components/flex/Flex';
import URLInput from '@lvlsgroup/react-component-lib/src/client/components/urlinputs/urlInput/UrlInput';
import Button from '@lvlsgroup/react-component-lib/src/client/components/inputs/button/Button';
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
        <SwapHistory />
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

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function SwapHistory({ className }) {
  return (
    <div className={styles.swapHistory}>
      {ROWS.map((row) => {
        return <SwapHistoryRow key={row} row={row} />;
      })}
    </div>
  );
}

function SwapHistoryRow({ className, row }) {
  return (
    <Flex className={classNames(styles.swapHistoryRow, styleHelper.mgt8)}>
      <div>{row}</div>
    </Flex>
  );
}
