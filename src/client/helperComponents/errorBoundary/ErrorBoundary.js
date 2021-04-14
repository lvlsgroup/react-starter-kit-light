import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './errorBoundary.scss';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });

    console.error('ErrorBoundary error ===== ', error);
    console.error('ErrorBoundary info ===== ', info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.boundary}>
          <div className={styles.heading}>ERROR</div>
          <div className={styles.subHeader}>TRY REFRESH</div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default withRouter(ErrorBoundary);
