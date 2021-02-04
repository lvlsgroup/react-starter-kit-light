import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './HomeRoute.scss';

class HomeRoute extends React.Component {
  render() {
    return (
      <div className={classNames(styles.HomeRoute)}>
        <h1 onClick={this.handleFileRemove} className={styles.title}>
          Home
        </h1>
      </div>
    );
  }
}

export default connect()(HomeRoute);
