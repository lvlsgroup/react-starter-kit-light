import universal from 'react-universal-component';
import Loader from '@client/components/loader/Loader';
import ErrorLoadingRouteChunk from '@client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: Loader,
  ignoreBabelRename: true,
};

export const ROUTES = {
  home: '/',
  undefined: '/go-to-undefined',
};

export default [
  {
    path: ROUTES.home,
    exact: true,
    componentPath: 'pages/homePage/HomePage',
    Component: universal(import('pages/homePage/HomePage'), options),
  },
  {
    path: ROUTES.undefined,
    exact: true,
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), options),
  },
  {
    path: '*',
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), options),
    status: 404,
  },
];
