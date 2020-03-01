import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './mintrPage.scss';

class MintrPage extends React.Component {
  render() {
    return (
      <div className={classNames(styles.mintrPage, styleHelper.pageContainer)}>
        <MintrOverviewSection />
      </div>
    );
  }
}

export default connect()(MintrPage);

function MintrOverviewSection() {
  return (
    <section>
      <div>MINTR</div>
    </section>
  );
}
