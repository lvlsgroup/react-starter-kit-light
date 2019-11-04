import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { hydrate } from 'react-dom';
import history from '@client/shared/utils/history';
import AppFrameProvider from '@client/context/AppFrameProvider';
import AppFrame from './containers/appFrame/AppFrame';
import 'shared/styles/base.scss';

// Scroll to top on history change
history.listen(() => {
  if (typeof window === 'object') {
    window.scrollTo(0, 0);
  }
});

const renderApp = (AppFrame) => {
  hydrate(
    <HelmetProvider>
      <Router history={history}>
        <AppFrameProvider data={window.__SERVER_STATE__}>
          <CookiesProvider>
            <AppFrame />
          </CookiesProvider>
        </AppFrameProvider>
      </Router>
    </HelmetProvider>,
    document.getElementById('root')
  );
};

renderApp(hot(AppFrame));
