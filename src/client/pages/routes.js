import universal from 'react-universal-component';
import SyncLoaderFullScreen from '@lvlsgroup/react-component-lib/src/client/components/loaders/syncLoader/SyncLoaderFullScreen';
import ErrorLoadingRouteChunk from '@client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: SyncLoaderFullScreen,
  ignoreBabelRename: true,
};

const ALL_ROUTES = [
  {
    path: '/',
    exact: true,
    componentPath: 'pages/homePage/HomePage',
    Component: universal(import('pages/homePage/HomePage'), options),
  },
  {
    path: '*',
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), options),
    status: 404,
  },
];

export default ALL_ROUTES;
