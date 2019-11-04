import React from 'react';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import ReactLink from '@client/components/reactLink/ReactLink';
import styles from './homePage.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.homeRoute}>
        <h1 className={styles.title}>Home page</h1>
        <i className={themeStyles.iconHome} />
        <ReactLink to={`/go-to-undefined`}>Not found page</ReactLink>
      </div>
    );
  }
}

export default HomePage;
