import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
            <Button className={styles.thButton} label="DATE" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="SOLD" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="AMOUNT" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="BOUGHT" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="RECEIVED" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="PRICE+" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="PRICE-" />
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
      <td className={classNames(styles.td)}>20-01-10</td>
      <td className={classNames(styles.td)}>sUSD</td>
      <td className={classNames(styles.td)}>120$</td>
      <td className={classNames(styles.td)}>sETH</td>
      <td className={classNames(styles.td)}>0.5¥</td>
      <td className={classNames(styles.td)}>186</td>
      <td className={classNames(styles.td)}>0.1</td>
    </tr>
  );
}
