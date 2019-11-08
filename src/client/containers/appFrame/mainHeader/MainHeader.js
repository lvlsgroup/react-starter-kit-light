import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './mainHeader.scss';

class MainHeader extends PureComponent {
  render() {
    return <header className={styles.mainHeader}></header>;
  }
}

export default withRouter(MainHeader);
