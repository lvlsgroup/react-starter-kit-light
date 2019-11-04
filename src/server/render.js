import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ReactDOMServer from 'react-dom/server';
import ContentServerService from '@server/ContentServerService';
import AppFrame from '../client/containers/appFrame/AppFrame';
import { getHtml } from './views/htmlHelpers';
import { preloadDataErrorHandler, preloadRouteData } from './renderUtils';

export default ({ clientStats }) => (req, res) => {
  const routerContext = {};
  const helmetContext = {};

  const ServerApp = () => (
    <HelmetProvider context={helmetContext}>
      <CookiesProvider cookies={req.universalCookies}>
        <StaticRouter location={req.url} context={routerContext}>
          <AppFrame />
        </StaticRouter>
      </CookiesProvider>
    </HelmetProvider>
  );

  const contentService = new ContentServerService();

  preloadRouteData(req, contentService)
    .then(() => {
      const reactDomString = ReactDOMServer.renderToString(
        contentService.withProvider(<ServerApp />)
      );

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
            let stateJson = JSON.stringify(contentService.getInitialState());
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
