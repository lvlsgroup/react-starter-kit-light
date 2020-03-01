import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReactLink from '@lvlsgroup/react-component-lib/src/client/components/links/reactLink/ReactLink';
import { Switch } from 'react-router-dom';
import { ROUTES_SNX_SYNTH_SWAP } from '@client/pages/snxSynthSwapPage/routesSnxSynthSwap';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import { routeWithSubRoutes } from '@client/shared/utils/routerUtils/routerUtils';
import styles from './snxSynthSwapPage.scss';

const childRoutes = ROUTES_SNX_SYNTH_SWAP.slice(1);

class SnxSynthSwapPage extends React.Component {
  static loadData() {
    console.log('SnxSynthSwapPage loadData');
  }

  render() {
    return (
      <div
        className={classNames(
          styles.snxSynthSwapPage,
          styleHelper.pageContainer
        )}
      >
        <SwapHeaderSection />
        <SwapSynthSection />
        <SwapMenu routes={childRoutes} />
        <Switch>
          {childRoutes &&
            childRoutes.map((route, index) => {
              return routeWithSubRoutes(route, index);
            })}
        </Switch>
      </div>
    );
  }
}

export default connect()(SnxSynthSwapPage);

function SwapHeaderSection() {
  return (
    <section className={classNames(styles.swapHeaderSection)}>
      <h1>Fast and simple way to swap synthetic assets</h1>
    </section>
  );
}

function SwapSynthSection() {
  return (
    <section className={classNames(styles.swapSynthSection)}>
      <div>MINTR</div>
    </section>
  );
}

function SwapMenu({ routes }) {
  return (
    <nav className={classNames(styles.swapMenu)}>
      <ul className={classNames(styles.swapMenuListing)}>
        {routes &&
          routes.map((route) => {
            return (
              <ReactLink
                key={route.path + route.label}
                className={styles.routeLink}
                to={route.path}
              >
                <li className={styles.listItem}>
                  <span className={styles.routeLabel}>{route.label}</span>
                </li>
              </ReactLink>
            );
          })}
      </ul>
    </nav>
  );
}
