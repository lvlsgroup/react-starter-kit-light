import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import asyncReducers from '@client/redux/asyncReducers';
import LazyLoadContext from '@client/helperComponents/context/LazyLoadContext';
import configureStore from '@client/redux/configureStore';
import AppFrame from '../client/appFrame/AppFrame';
import { getHtml } from './views/htmlHelpers';
import { preloadDataErrorHandler, preloadRouteData } from './renderUtils';

export default ({ clientStats }) => (req, res) => {
  const routerContext = {};
  const helmetContext = {};

  const { store } = configureStore({ extraReducers: asyncReducers });
  const lazyLoadContextValue = {
    injectReducer: store.injectReducer,
  };

  const ServerApp = () => (
    <HelmetProvider context={helmetContext}>
      <LazyLoadContext.Provider value={lazyLoadContextValue}>
        <Provider store={store} key="provider">
          <CookiesProvider cookies={req.universalCookies}>
            <StaticRouter location={req.url} context={routerContext}>
              <AppFrame />
            </StaticRouter>
          </CookiesProvider>
        </Provider>
      </LazyLoadContext.Provider>
    </HelmetProvider>
  );

  preloadRouteData(req, store)
    .then(() => {
      const reactDomString = ReactDOMServer.renderToString(<ServerApp />);

      if (routerContext.url) {
        const status =
          (routerContext.location && routerContext.location.status) || 302;
        return res.redirect(status, routerContext.url);
      } else {
        switch (routerContext.status) {
          case 302:
            res.status(routerContext.status);
            res.location(routerContext.url);
            res.end();
            break;
          default: {
            const { styles, js, cssHash } = flushChunks(clientStats, {
              chunkNames: flushChunkNames(),
            });
            let stateJson = JSON.stringify(store.getState());
            const helmet = helmetContext.helmet;
            res.status(routerContext.status || 200).send(
              getHtml({
                stateJson,
                js,
                cssHash,
                styles,
                reactDomString,
                helmet,
              })
            );
          }
        }
      }
    })
    .catch((err) => {
      preloadDataErrorHandler(err, res, req);
    });
};
