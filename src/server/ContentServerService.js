import React from 'react';
import AppFrameProvider from '@client/context/AppFrameProvider';

export class ContentServerService {
  initialState = {};

  loadToState = (loadData) => {
    console.log('loadData: ', loadData);
    loadData.then((res) => (this.initialState[res.key] = res.payload));
  };

  withProvider = (app) => {
    const providedApp = (
      <AppFrameProvider data={this.initialState}>{app}</AppFrameProvider>
    );

    return providedApp;
  };

  getInitialState() {
    return this.initialState;
  }
}

export default ContentServerService;
