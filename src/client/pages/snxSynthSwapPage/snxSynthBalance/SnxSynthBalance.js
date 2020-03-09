import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Flex from '@lvlsgroup/react-component-lib/src/client/components/flex/Flex';
import Button from '@lvlsgroup/react-component-lib/src/client/components/inputs/button/Button';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './snxSynthBalance.scss';

class SnxSynthBalance extends React.PureComponent {
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
        <Flex alignCenter>
          <input type="checkbox" /> hide dust
        </Flex>
        <SwapHistory />
      </section>
    );
  }
}

SnxSynthBalance.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default connect()(SnxSynthBalance);

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function SwapHistory({ className }) {
  return (
    <table className={styles.swapHistoryTable}>
      <colgroup>
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
      </colgroup>
      <thead>
        <tr className={classNames(styles.tr, styles.trHeader)}>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="SYMBOL" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="BALANCE" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="sUSD value" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="sBTC value" />
          </th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => {
          return <SwapHistoryRow key={row} row={row} />;
        })}
      </tbody>
    </table>
  );
}

function SwapHistoryRow({ className, row }) {
  return (
    <tr className={classNames(styles.tr, styles.swapHistoryRow)}>
      <td className={classNames(styles.td)}>sETH</td>
      <td className={classNames(styles.td)}>2</td>
      <td className={classNames(styles.td)}>424$</td>
      <td className={classNames(styles.td)}>0.14£</td>
    </tr>
  );
}
