import React from 'react';
import { connect } from 'react-redux';
import styles from './homePage.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.homeRoute}>
        <h1 className={styles.title}>Home page</h1>
      </div>
    );
  }
}

export default connect()(HomePage);
