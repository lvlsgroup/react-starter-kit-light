import React from 'react';
import { connect } from 'react-redux';
import DropzoneWithPreview from '@lvlsgroup-components/dropzones/dropzoneWithPreview/DropzoneWithPreview';
import styles from './homePage.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.homeRoute}>
        <h1 onClick={this.handleFileRemove} className={styles.title}>
          Home
        </h1>
        <h1 className={styles.title}>Home</h1>
        <DropzoneWithPreview>
          <div>DROP FILES HERE</div>
        </DropzoneWithPreview>
      </div>
    );
  }
}

export default connect()(HomePage);
