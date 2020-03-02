import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import LazyLoadContext from '@client/helperComponents/context/LazyLoadContext';
import history from '@client/shared/utils/history';
import configureStore from './redux/configureStore';
import AppFrame from './containers/appFrame/AppFrame';
import 'shared/styles/base.scss';

// Scroll to top on history change
history.listen((location) => {
  if (typeof window === 'object') {
    if (location.state?.dontScrollToTop !== true) {
      window.scrollTo(0, 0);
    }
  }
});

const initialState = window.__SERVER_STATE__;

const { store } = configureStore({
  initialState,
});

const lazyLoadContextValue = {
  injectReducer: store.injectReducer,
};

const renderApp = (AppFrame) => {
  hydrate(
    <HelmetProvider>
      <LazyLoadContext.Provider value={lazyLoadContextValue}>
        <Provider store={store}>
          <Router history={history}>
            <CookiesProvider>
              <AppFrame />
            </CookiesProvider>
          </Router>
        </Provider>
      </LazyLoadContext.Provider>
    </HelmetProvider>,
    document.getElementById('root')
  );
};

renderApp(hot(AppFrame));
