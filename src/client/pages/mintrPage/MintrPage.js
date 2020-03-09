import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Flex from '@lvlsgroup/react-component-lib/src/client/components/flex/Flex';
import Button from '@lvlsgroup/react-component-lib/src/client/components/inputs/button/Button';
import ReactLink from '@lvlsgroup/react-component-lib/src/client/components/links/reactLink/ReactLink';
import Input from '@lvlsgroup/react-component-lib/src/client/components/inputs/input/Input';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './mintrPage.scss';

// TODO: idea, gamify mintr participation, ?different levels one can achieve (maybe one can get a badge in discord, GOD-Mintr or something)?
class MintrPage extends React.Component {
  render() {
    return (
      <div className={classNames(styles.mintrPage)}>
        <MintrOverviewSection />
        <div
          className={classNames(
            styleHelper.pageWidthAndCentralizer,
            styleHelper.mgt8,
            styles.menuAndContentContainer
          )}
        >
          <MintrMainMenu />
          <EscrowContainer />
        </div>
      </div>
    );
  }
}

export default connect()(MintrPage);

function EscrowContainer() {
  return (
    <section className={styles.escrowContainer}>
      <h3>Vest your SNX staking rewards in escrow</h3>
      <p className={styleHelper.mgt8}>
        If you have staked your SNX and minted sUSD, you are eligible to receive
        SNX staking rewards, which you can vest here after they have been
        escrowed for 12 months.
      </p>
      <Flex alignCenter justifyCenter flexNr={1}>
        You have no escrowed SNX
      </Flex>
      <Flex>
        <Button
          className={classNames(
            styles.escrowBtn,
            styleHelper.btnContainedMintrMd
          )}
          label={'VIEW TOKEN SALE ESCROW'}
        />
        <Button
          className={classNames(
            styles.escrowBtn,
            styleHelper.btnContainedMintrMd
          )}
          label={'VEST NOW'}
        />
      </Flex>
    </section>
  );
}

function MintrOverviewSection() {
  return (
    <section className={styles.mintOverviewSection}>
      <div
        className={classNames(
          styles.mintrOverviewContent,
          styleHelper.pageWidthAndCentralizer
        )}
      >
        <h1 className={classNames(styles.mintrTitle)}>Mint Synthetic Assets</h1>
        <Flex
          className={classNames(
            styles.mintrOverviwContainer,
            styleHelper.mgt16
          )}
        >
          <MintrInfoBox />
          <div className={classNames(styles.quickMintrActions)}>
            <Flex>
              <ClaimBox />
              <Flex column spaceBetween className={styleHelper.mgl8}>
                <MintBox />
                <BurnBox className={styleHelper.mgt8} />
              </Flex>
            </Flex>
            <div className={classNames(styles.ethFeesInfo, styleHelper.mgt8)}>
              <span>Ethereum network fees: $0 / 3 GWEI </span>
              <button>EDIT</button>
            </div>
          </div>
        </Flex>
      </div>
    </section>
  );
}

function BurnBox({ className }) {
  return (
    <div className={classNames(styles.burnBox, className)}>
      <Flex>
        <Input
          autoComplete="nope"
          className={styleHelper.inputLg}
          name={'mintAmount'}
          placeholder="Enter amount to mint"
        />
      </Flex>
      <Button
        className={classNames(
          styleHelper.btnContainedMintrSm,
          styleHelper.mgt8
        )}
        label={'BURN'}
      />
    </div>
  );
}

function MintBox({ className }) {
  return (
    <div className={classNames(styles.mintBox, className)}>
      <Flex>
        <Input
          autoComplete="nope"
          className={styleHelper.inputLg}
          name={'mintAmount'}
          placeholder="Enter amount to mint"
        />
      </Flex>
      <Button
        className={classNames(
          styleHelper.btnContainedMintrSm,
          styleHelper.mgt8
        )}
        label={'MINT'}
      />
    </div>
  );
}

function ClaimBox({ className }) {
  return (
    <div className={classNames(styles.claimBox)}>
      <MintrClaimInfoTable className={styles.mintrClaimInfoTableProp} />
      <Flex
        flexNr={1}
        column
        className={classNames(styles.claimContainer, styleHelper.mgt8)}
      >
        <div>Exchange rewards: 24 sUSD</div>
        <div>Staking rewards: 44 SNX</div>
      </Flex>
      <Button
        className={classNames(
          styleHelper.btnContainedMintrSm,
          styleHelper.mgt16
        )}
        label={'CLAIM'}
      />
    </div>
  );
}

function MintrClaimInfoTable({ className }) {
  return (
    <table className={classNames(styles.swapHistoryTable, className)}>
      <colgroup>
        <col width={'80'} />
        <col width={'80'} />
        <col width={'120'} />
      </colgroup>
      <thead>
        <tr className={classNames(styles.tr, styles.trHeader)}>
          <th className={classNames(styles.th)}>sUSD</th>
          <th className={classNames(styles.th)}>SNX</th>
          <th className={classNames(styles.th)}>Period</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classNames(styles.tr, styles.swapHistoryRow)}>
          <td className={classNames(styles.td)}>12</td>
          <td className={classNames(styles.td)}>24</td>
          <td className={classNames(styles.td)}>10 days left</td>
        </tr>
        <tr className={classNames(styles.tr, styles.swapHistoryRow)}>
          <td className={classNames(styles.td)}>12</td>
          <td className={classNames(styles.td)}>24</td>
          <td className={classNames(styles.td)}>3 days left</td>
        </tr>
      </tbody>
    </table>
  );
}

function MintrAcountInfoRow({ className }) {
  return (
    <table className={styles.swapHistoryTable}>
      <colgroup>
        <col width={'120'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'160'} />
        <col width={'120'} />
        <col width={'120'} />
        <col width={'140'} />
      </colgroup>
      <thead>
        <tr className={classNames(styles.tr, styles.trHeader)}>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Your Ratio" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Target Ratio" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Total SNX" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Transferable SNX" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Locked SNX" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Staked SNX" />
          </th>
          <th className={classNames(styles.th)}>
            <Button className={styles.thButton} label="Escrowed SNX" />
          </th>
        </tr>
      </thead>
      <tbody>
        <SwapHistoryRow />
      </tbody>
    </table>
  );
}

function SwapHistoryRow({ className, row }) {
  return (
    <tr className={classNames(styles.tr, styles.swapHistoryRow)}>
      <td className={classNames(styles.td)}>540%</td>
      <td className={classNames(styles.td)}>750%</td>
      <td className={classNames(styles.td)}>2340</td>
      <td className={classNames(styles.td)}>233</td>
      <td className={classNames(styles.td)}>90%</td>
      <td className={classNames(styles.td)}>102</td>
      <td className={classNames(styles.td)}>0</td>
    </tr>
  );
}

function MintrMainMenu() {
  return (
    <nav className={classNames(styles.mintrMainMenu)}>
      <ul className={classNames(styles.swapMenuListing)}>
        <li className={styles.listItem}>
          <ReactLink className={classNames(styles.tabBtn)}>ESCROW</ReactLink>
        </li>
        <li className={styles.listItem}>
          <ReactLink className={classNames(styles.tabBtn)}>
            TRANSACTIONS
          </ReactLink>
        </li>
        <li className={styles.listItem}>
          <ReactLink className={classNames(styles.tabBtn)}>DEPOT</ReactLink>
        </li>
        <li className={styles.listItem}>
          <ReactLink className={classNames(styles.tabBtn)}>UNIPOOL</ReactLink>
        </li>
      </ul>
    </nav>
  );
}

function MintrInfoBox() {
  return (
    <div className={classNames(styles.mintrInfoBox)}>
      {/*      <h3>Wallet info</h3>*/}
      <Flex>
        <div className={classNames(styles.mintrInfoCell)}>
          <div>
            <h4>540%</h4>
            <span>Current</span>
          </div>
        </div>
        <div className={classNames(styles.mintrInfoCell)}>
          <div>
            <h4>750%</h4>
            <span>Target</span>
          </div>
        </div>
      </Flex>
      <div className={classNames(styles.mintrInfoCellSm)}>
        <span>Total SNX: 2300</span>
      </div>
      <div className={classNames(styles.mintrInfoCellSm)}>
        <span>Transferable SNX: 230</span>
      </div>
      <div className={classNames(styles.mintrInfoCellSm)}>
        <span>Locked SNX: 90%</span>
      </div>
    </div>
  );
}
