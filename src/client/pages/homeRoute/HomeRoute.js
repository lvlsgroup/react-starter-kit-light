import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { useThemeStyles } from '@client/helperComponents/withThemeStyles/withThemeStyles';
import Button from '@client/atomicComponents/atoms/button/Button';
import styles from './HomeRoute.scss';

class HomeRoute extends React.Component {
  render() {
    const theme = useThemeStyles();

    return (
      <div className={classNames(styles.HomeRoute)}>
        <h1 onClick={this.handleFileRemove} className={styles.title}>
          Home
        </h1>
        <div className={theme.contentContainerMd}>
          <Button
            className={theme.btnPrimary}
            label={'Primary Styles Button'}
          />
        </div>
      </div>
    );
  }
}

export default connect()(HomeRoute);
