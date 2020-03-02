import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReactLink from '@lvlsgroup/react-component-lib/src/client/components/links/reactLink/ReactLink';
import { Switch } from 'react-router-dom';
import URLInput from '@lvlsgroup/react-component-lib/src/client/components/urlinputs/urlInput/UrlInput';
import Button from '@lvlsgroup/react-component-lib/src/client/components/inputs/button/Button';
import Flex from 'lvlsgroup-components/flex/Flex';
import UrlSelect from '@lvlsgroup/react-component-lib/src/client/components/urlinputs/urlSelect/UrlSelect';
import { ROUTES_SNX_SYNTH_SWAP } from '@client/pages/snxSynthSwapPage/routesSnxSynthSwap';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import { routeWithSubRoutes } from '@client/shared/utils/routerUtils/routerUtils';
import SnxSynthSwapHistoryRoute from '@client/pages/snxSynthSwapPage/snxSynthSwapHistoryRoute/SnxSynthSwapHistoryRoute';
import styles from './snxSynthSwapPage.scss';

const childRoutes = ROUTES_SNX_SYNTH_SWAP.slice(1);

class SnxSynthSwapPage extends React.Component {
  static loadData() {
    console.log('SnxSynthSwapPage loadData');
  }

  render() {
    return (
      <div className={classNames(styles.snxSynthSwapPage)}>
        <SwapSynthSection />
        <div
          className={classNames(
            styleHelper.pageWidthAndCentralizer,
            styleHelper.mgt8,
            styles.menuAndContentContainer
          )}
        >
          <SwapMenu routes={childRoutes} />
          <SnxSynthSwapHistoryRoute />
        </div>
      </div>
    );
  }
}

export default connect()(SnxSynthSwapPage);

function SwapSynthSection() {
  return (
    <section className={classNames(styles.swapSynthSection)}>
      <div
        className={classNames(
          styles.swapSynthContainer,
          styleHelper.pageWidthAndCentralizer
        )}
      >
        <h1>Synthetic Assets Swap</h1>
        <SwapSynth className={classNames(styleHelper.mgt16)} />
      </div>
    </section>
  );
}

const OPTIONS = [
  { value: 'sETH', label: 'sETH' },
  { value: 'sBTC', label: 'sBTC' },
  { value: 'sEUR', label: 'sEUR' },
];

const OPTIONS_2 = [
  { value: 'sETH', label: 'sETH' },
  { value: 'sBTC', label: 'sBTC' },
  { value: 'sEUR', label: 'sEUR' },
];

function SwapSynth({ className }) {
  return (
    <div className={classNames(styles.swapSynth, className)}>
      <Flex alignCenter className={classNames(styleHelper.mgt8)}>
        <Flex className={classNames(styles.synthChooserContainer)}>
          <UrlSelect
            className={styles.urlSelectProp}
            options={OPTIONS}
            searchParam={'from'}
          />
          <input type="number" className={styles.inputProp} defaultValue={0} />
        </Flex>
        <span className={classNames(styles.synthSwapIcon)}>↔</span>
        <Flex className={classNames(styles.synthChooserContainer)}>
          <UrlSelect
            className={styles.urlSelectProp}
            options={OPTIONS_2}
            searchParam={'to'}
          />
          <input type="number" className={styles.inputProp} defaultValue={0} />
        </Flex>
      </Flex>
      <Flex className={classNames(styleHelper.mgt8)}>
        <span>info</span>
        <span>info</span>
        <span>info</span>
      </Flex>
      <Button
        className={classNames(
          styleHelper.btnContained,
          styleHelper.marginCenter,
          styleHelper.mgt24
        )}
        label={'SWAP'}
      />
    </div>
  );
}

function SwapMenu({ className, routes }) {
  return (
    <nav className={classNames(styles.swapMenu, className)}>
      <ul className={classNames(styles.swapMenuListing)}>
        <li className={styles.listItem}>
          <Button label="HISTORY" />
        </li>
        <li className={styles.listItem}>
          <Button label="SYNTH BALANCE" />
        </li>
      </ul>
    </nav>
  );
}
