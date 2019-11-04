import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import themeStyles from '@client/shared/styles/theme/theme-styles.scss';
import styles from './mainHeader.scss';

class MainHeader extends PureComponent {
  render() {
    return (
      <header className={styles.mainHeader}>
        <div className={styles.stickyHeader}>
          <i
            className={`${themeStyles.iconHamburger} ${styles.navBarButtonIcon}`}
          />
        </div>
      </header>
    );
  }
}

export default withRouter(MainHeader);
