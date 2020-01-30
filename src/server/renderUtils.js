import path from 'path';
import url from 'url';
import { matchRoutes } from 'react-router-config';
import { get500 } from '@server/views/htmlHelpers';
import routes from '../client/pages/routes';

export function preloadRouteData(req, store) {
  return Promise.all(getRoutePromises(req.url, store));
}

function getRoutePromises(reqUrl, store) {
  const matchedRoutePromises = matchRoutes(staticRoutes, reqUrl);

  const routePromises = matchedRoutePromises.reduce(
    (accumPromises, { route, match }) => {
      const wrappedContainer =
        route.staticComponent && route.staticComponent.WrappedComponent;
      if (wrappedContainer && wrappedContainer.loadData) {
        const parsedUrl = url.parse(reqUrl);
        accumPromises.push(
          wrappedContainer.loadData(store.dispatch, parsedUrl, match.params)
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

// The components that we're declaring in pages.js are imported async, so we can't garantee that
// they're loaded when we want to call loadData on the server and thus we need to import them
// staticly/synchronously. This we do with an old-school require.
// TODO: Make it recursive so it will support loadData for more than 3 levels of child routes
const staticRoutes = routes.map((route) => {
  const staticComponent = requireStaticComponent(route);

  if (route.routes) {
    let staticChildren = getMappedRoutes(route.routes);

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

function getMappedRoutes(routes) {
  return routes.map((childRoute) => {
    const staticComponent = requireStaticComponent(childRoute);

    if (childRoute.routes) {
      let staticChildren = getMappedRoutes(childRoute.routes);

      return {
        staticComponent,
        ...childRoute,
        routes: staticChildren,
      };
    } else {
      return {
        staticComponent,
        ...childRoute,
      };
    }
  });
}

function requireStaticComponent(route) {
  return require(`../client/${route.componentPath}`).default;
}
