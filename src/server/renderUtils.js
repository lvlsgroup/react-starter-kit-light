import path from 'path';
import url from 'url';
import { matchPath } from 'react-router-dom';
import { get500 } from '@server/views/htmlHelpers';
import { getRouteValues } from '@client/routes/mainRoutesUtils';
import AppFrame from '@client/appFrame/AppFrame';
import { getLanguageCode } from '@client/shared/utils/globalProjectUtils/languageUtils/languageUtils';

export function preloadRouteData(req, store) {
  const parsedUrl = url.parse(req.url);
  const { dispatch } = store;
  const languageCode = getLanguageCode(req.hostname);

  return AppFrame.loadData({ dispatch, languageCode }).then(() => {
    return Promise.all(getRoutePromises(req.url, dispatch, parsedUrl));
  });
}

function getRoutePromises(reqUrl, dispatch, parsedUrl) {
  const matchedRoutePromises = matchMyRoutes(staticRoutes, reqUrl);

  const routePromises = matchedRoutePromises.reduce(
    (accumPromises, { route, match }) => {
      const wrappedContainer =
        route.staticComponent && route.staticComponent.WrappedComponent;
      if (wrappedContainer && wrappedContainer.loadData) {
        accumPromises.push(
          wrappedContainer.loadData({
            dispatch: dispatch,
            location: parsedUrl,
            mathParams: match.params,
          })
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
  if (err.status === 408 || err.code === 'ECONNABORTED') {
    // Timeout error, request took too long
    res.status(503).sendFile(path.join(`${__dirname}/500-sv.html`));
    console.error(
      `${new Date().toUTCString()}\t==> Request timeout= ${err}\turl=${req.url}`
    );
  } else {
    switch (err.status) {
      case 401: {
        // Invalid accessToken
        req.universalCookies.remove('accessToken');
        return res.redirect('/login');
      }
      case 403: {
        // Not correct permissions
        req.universalCookies.remove('accessToken');
        return res.redirect('/login');
      }
      case 503: {
        return res.status(503).sendFile(path.join(`${__dirname}/500-sv.html`));
      }
      default: {
        const status = err.status || 500;
        return res.status(status).send(get500(status, err));
      }
    }
  }
}

function matchMyRoutes(staticRoutes, reqUrl) {
  let notFoundPage = [];

  const matches = staticRoutes.reduce((accum, staticRoute) => {
    const matched = matchPath(reqUrl, staticRoute);
    const isNotFoundPage = staticRoute.path === '*';

    if (isNotFoundPage) {
      notFoundPage.push({ route: staticRoute, match: matched });
      return accum;
    } else if (matched) {
      accum.push({ route: staticRoute, match: matched });
      return accum;
    } else {
      return accum;
    }
  }, []);

  if (matches.length > 0) {
    return matches;
  } else {
    return notFoundPage;
  }
}

// The components that we're declaring in pages.js are imported async, so we can't garantee that
// they're loaded when we want to call loadData on the server and thus we need to import them
// staticly/synchronously. This we do with an old-school require.
// TODO: Make it recursive so it will support loadData for more than 3 levels of child routes
const staticRoutes = getRouteValues().map((route) => {
  const staticComponent = requireStaticComponent(route);

  return {
    staticComponent,
    ...route,
  };
});

function requireStaticComponent(route) {
  return require(`../client/${route.componentPath}`).default;
}
