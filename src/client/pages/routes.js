import universal from 'react-universal-component';
import SyncLoaderFullScreen from '@lvlsgroup/react-component-lib/src/client/components/loaders/syncLoader/SyncLoaderFullScreen';
import ErrorLoadingRouteChunk from '@client/helperComponents/errorLoadingRouteChunk/ErrorLoadingRouteChunk';

export const OPTIONS = {
  error: ErrorLoadingRouteChunk,
  loading: SyncLoaderFullScreen,
  ignoreBabelRename: true,
};

const ALL_ROUTES = {
  HOME: {
    path: '/',
    exact: true,
    componentPath: 'pages/homeRoute/HomeRoute',
    Component: universal(import('pages/homeRoute/HomeRoute'), OPTIONS),
    metaData: {
      url: '/',
    },
  },
  NOT_FOUND_PAGE: {
    path: '*',
    componentPath: 'pages/notFoundRoute/NotFoundRoute',
    Component: universal(import('pages/notFoundRoute/NotFoundRoute'), OPTIONS),
    status: 404,
  },
};

export default ALL_ROUTES;
