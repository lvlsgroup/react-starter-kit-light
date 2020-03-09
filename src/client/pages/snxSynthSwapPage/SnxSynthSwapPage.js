import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from '@lvlsgroup/react-component-lib/src/client/components/inputs/button/Button';
import Flex from 'lvlsgroup-components/flex/Flex';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import DropdownSelector from '@lvlsgroup/react-component-lib/src/client/components/selectors/dropdownSelector/DropdownSelector';
import UrlInput from '@lvlsgroup/react-component-lib/src/client/components/urlinputs/urlInput/UrlInput';
import { SynthetixJs } from 'synthetix-js';
import { ROUTES_SNX_SYNTH_SWAP } from '@client/pages/snxSynthSwapPage/routesSnxSynthSwap';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import SnxSynthSwapHistoryRoute from '@client/pages/snxSynthSwapPage/snxSynthSwapHistoryRoute/SnxSynthSwapHistoryRoute';
import SnxSynthBalance from '@client/pages/snxSynthSwapPage/snxSynthBalance/SnxSynthBalance';
import styles from './snxSynthSwapPage.scss';

const childRoutes = ROUTES_SNX_SYNTH_SWAP.slice(1);

// TODO: idea, gamify trading, show your trading stats % profits, propose to beat system average (get bonus?) (limitations, one trade a day so no bots, this should be incentivized for mintrs to trade)
class SnxSynthSwapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'history',
    };
  }
  static loadData() {
    console.log('SnxSynthSwapPage loadData');
  }

  onTabChange = (tab) => {
    this.setState((state) => {
      return {
        ...state,
        activeTab: tab,
      };
    });
  };

  render() {
    console.log('this.props', this.props);
    const { activeTab } = this.state;
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
          <SwapMenu
            routes={childRoutes}
            onTabChange={this.onTabChange}
            activeTab={activeTab}
          />
          {activeTab === 'history' ? (
            <SnxSynthSwapHistoryRoute />
          ) : (
            <SnxSynthBalance />
          )}
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
        <h1 className={classNames(styles.swapTitle)}>Synthetic Assets Swap</h1>
        <UrlSwapSynth className={classNames(styleHelper.mgt16)} />
      </div>
    </section>
  );
}

function UrlSwapSynth({ className, onPairChange }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const firstPair = params.synthPair?.split('-')[0];
  const secondPair = params.synthPair?.split('-')[1];

  const indexOfSelectedFromSynth = _SYNTHS?.findIndex((entry) => {
    return entry.value === firstPair;
  });
  const selectedFromSynth = _SYNTHS[indexOfSelectedFromSynth] || _SYNTHS[0];

  const indexOfSelectedToSynth = _SYNTHS?.findIndex((entry) => {
    return entry.value === secondPair;
  });
  const selectedToSynth = _SYNTHS[indexOfSelectedToSynth] || _SYNTHS[0];

  const onFromPairChange = (selected) => {
    const selectedValue = selected.value;
    const currentPair = params.synthPair;
    if (currentPair) {
      const toPair = currentPair.split('-')[1];
      const url = `${selectedValue}-${toPair}`;
      updateUrl(url);
    } else {
      const url = `${location.pathname}/${selectedValue}-${selectedFromSynth.value}`;
      updateUrl(url);
    }
  };

  const onToPairChange = (selected) => {
    const selectedValue = selected.value;
    const currentPair = params.synthPair;
    if (currentPair) {
      const fromPair = currentPair.split('-')[0];
      const url = `${fromPair}-${selectedValue}`;
      updateUrl(url);
    } else {
      const url = `${location.pathname}/${selectedToSynth.value}-${selectedValue}`;
      updateUrl(url);
    }
  };

  const updateUrl = (url) => {
    history.push(url);
  };

  return (
    <div className={classNames(styles.swapSynth, className)}>
      <div>
        <Flex alignCenter className={classNames(styleHelper.mgt8)}>
          <Flex className={classNames(styles.synthChooserContainer)}>
            <DropdownSelector
              className={styles.urlSelectProp}
              selected={selectedFromSynth}
              instanceId={'fromSynth'}
              options={_SYNTHS}
              onChange={onFromPairChange}
            />
            <UrlInput
              className={styles.inputProp}
              searchParam={'a'}
              historyAction={'replace'}
            />
          </Flex>
          <span className={classNames(styles.synthSwapIcon)}>↔</span>
          <div>
            <Flex className={classNames(styles.synthChooserContainer)}>
              <DropdownSelector
                className={styles.urlSelectProp}
                selected={selectedToSynth}
                instanceId={'toSynth'}
                options={_SYNTHS}
                onChange={onToPairChange}
              />
              <UrlInput
                className={styles.inputProp}
                searchParam={'b'}
                historyAction={'replace'}
              />
            </Flex>
          </div>
        </Flex>
        <Flex
          className={classNames(styles.currencyInformation, styleHelper.mgt8)}
          spaceBetween
        >
          <span>1 sUSD = 0.01 sETH</span>
          <span>1 sETH = 233 sUSD</span>
        </Flex>
      </div>
      <Button
        className={classNames(
          styleHelper.btnContainedMd,
          styleHelper.marginCenter,
          styleHelper.mgt24
        )}
        label={'SWAP'}
      />
    </div>
  );
}

function SwapMenu({ className, onTabChange, activeTab }) {
  const onHistoryClick = () => {
    const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet

    console.log('snxjs: ', snxjs.Synth.contractSettings.synths);
    console.log('snxjs: ', snxjs);

    snxjs.ExchangeRates.ratesForCurrencies([
      '0x694c494e4b000000000000000000000000000000000000000000000000000000',
    ]).then((res) => {
      console.log('currencies', res);
    });

    snxjs.sUSD.totalSupply().then((res) => {
      console.log(res);
    });
  };

  const onHistoryChange = () => {
    onTabChange('history');
    onHistoryClick();
  };

  const onBalanceChange = () => {
    onTabChange('balance');
    onHistoryClick();
  };

  const isTabActive = (tab) => {
    return tab === activeTab;
  };

  return (
    <nav className={classNames(styles.swapMenu, className)}>
      <ul className={classNames(styles.swapMenuListing)}>
        <li className={styles.listItem}>
          <Button
            className={classNames(
              styles.tabBtn,
              isTabActive('history') && styles.active
            )}
            onClick={onHistoryChange}
            label="HISTORY"
          />
        </li>
        <li className={styles.listItem}>
          <Button
            className={classNames(
              styles.tabBtn,
              isTabActive('balance') && styles.active
            )}
            onClick={onBalanceChange}
            label="BALANCE"
          />
        </li>
      </ul>
    </nav>
  );
}

const _SYNTHS = [
  {
    label: 'sUSD',
    value: 'sUSD',
  },
  {
    label: 'sETH',
    value: 'sETH',
  },
  {
    label: 'sEUR',
    value: 'sEUR',
  },
  {
    label: 'sBTC',
    value: 'sBTC',
  },
  {
    label: 'sXAU',
    value: 'sXAU',
  },
  {
    label: 'sXAG',
    value: 'sXAG',
  },
];
