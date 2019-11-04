import path from 'path';
import url from 'url';
import { matchRoutes } from 'react-router-config';
import { get500 } from '@server/views/htmlHelpers';
import routes from '../client/pages/routes';

// The components that we're declaring in pages.js are imported async, so we can't garantee that
// they're loaded when we want to call loadData on the server and thus we need to import them
// staticly/synchronously. This we do with an old-school require.
const staticRoutes = routes.map((route) => {
  const staticComponent = require(`../client/${route.componentPath}`).default;
  if (route.routes) {
    let staticChildren = route.routes.map((childRoute) => {
      const staticComponent = require(`../client/${childRoute.componentPath}`)
        .default;

      return {
        staticComponent,
        ...childRoute,
      };
    });

    return {
      staticComponent,
      ...route,
      routes: staticChildren,
    };
  } else {
    return {
      staticComponent,
      ...route,
    };
  }
});

export function preloadRouteData(req, contentService) {
  return Promise.all(getRoutePromises(req.url, contentService));
}

function getRoutePromises(reqUrl, contentService) {
  const matchedRoutePromises = matchRoutes(staticRoutes, reqUrl);

  const routePromises = matchedRoutePromises.reduce(
    (accumPromises, { route, match }) => {
      const sComponent = route.staticComponent;
      if (sComponent && sComponent.loadData) {
        const parsedUrl = url.parse(reqUrl);
        accumPromises.push(
          sComponent.loadData(contentService.loadToState, parsedUrl, match)
        );
        return accumPromises;
      }
      return accumPromises;
    },
    []
  );

  return routePromises;
}

export function preloadDataErrorHandler(err, res, req) {
  if (err.code === 'ECONNABORTED') {
    res.status(503).sendFile(path.join(`${__dirname}/500-sv.html`));
    console.error(
      `${new Date().toUTCString()}\t==> Request timeout= ${err}\turl=${req.url}`
    );
  } else {
    const status = err.response ? err.response.status : 502;
    res.status(status).send(get500());
    console.error(`SERVER ERROR: ${err.toString()}`);
  }
}
