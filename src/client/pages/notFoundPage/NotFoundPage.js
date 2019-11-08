import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class NotFoundPage extends PureComponent {
  render() {
    return (
      <div>
        <h1>Not found page</h1>
      </div>
    );
  }
}

export default connect()(NotFoundPage);
