import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styleHelper from '@client/shared/styles/styleHelper.scss';
import styles from './homePage.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className={classNames(styles.homeRoute, styleHelper.pageContainer)}>
        <h1 onClick={this.handleFileRemove} className={styles.title}>
          Home
        </h1>
      </div>
    );
  }
}

export default connect()(HomePage);
