import universal from 'react-universal-component';
import SyncLoaderFullScreen from '@lvlsgroup/react-component-lib/src/client/components/loaders/syncLoader/SyncLoaderFullScreen';
import ErrorLoadingRouteChunk from '@client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';

export const OPTIONS = {
  error: ErrorLoadingRouteChunk,
  loading: SyncLoaderFullScreen,
  ignoreBabelRename: true,
};

const ALL_ROUTES = [
  {
    path: '/',
    exact: true,
    componentPath: 'pages/homePage/HomePage',
    Component: universal(import('pages/homePage/HomePage'), OPTIONS),
    metaData: {
      url: '/',
      SHOW_IN_MAIN_NAV: true,
    },
  },
  {
    path: '*',
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), OPTIONS),
    status: 404,
  },
];

export default ALL_ROUTES;

export const getMainNavRoutes = () => {
  return ALL_ROUTES.filter((route) => {
    return route?.metaData?.SHOW_IN_MAIN_NAV;
  });
};
