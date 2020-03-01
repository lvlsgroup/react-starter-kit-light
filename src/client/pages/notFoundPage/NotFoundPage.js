import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styleHelper from '@client/shared/styles/styleHelper.scss';

class NotFoundPage extends PureComponent {
  render() {
    return (
      <div className={classNames(styleHelper.pageContainer)}>
        <h1>Not found page</h1>
      </div>
    );
  }
}

export default connect()(NotFoundPage);
