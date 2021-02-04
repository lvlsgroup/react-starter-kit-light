import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './NotFoundRoute.scss';

class NotFoundRoute extends PureComponent {
  render() {
    return (
      <div className={classNames(styles.NotFoundPage)}>
        <h1>Not found page</h1>
      </div>
    );
  }
}

export default connect()(NotFoundRoute);
