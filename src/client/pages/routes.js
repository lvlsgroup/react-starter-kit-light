import universal from 'react-universal-component';
import Loader from '@client/components/loader/Loader';
import ErrorLoadingRouteChunk from '@client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';
import { ROUTES_SNX_SYNTH_SWAP } from '@client/pages/snxSynthSwapPage/routesSnxSynthSwap';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: Loader,
  ignoreBabelRename: true,
};

export const MAIN_ROUTES = getMainRoutes();

export default [
  {
    path: MAIN_ROUTES.DASH_BOARD.TO,
    exact: true,
    componentPath: 'pages/homePage/HomePage',
    Component: universal(import('pages/homePage/HomePage'), options),
  },
  {
    path: MAIN_ROUTES.MINTR.TO,
    exact: true,
    componentPath: 'pages/mintrPage/MintrPage',
    Component: universal(import('pages/mintrPage/MintrPage'), options),
  },
  ...ROUTES_SNX_SYNTH_SWAP,
  {
    path: '*',
    componentPath: 'pages/notFoundPage/NotFoundPage',
    Component: universal(import('pages/notFoundPage/NotFoundPage'), options),
    status: 404,
  },
];

export function getMainRoutes(userRestrictions) {
  let routes = {
    DASH_BOARD: {
      TO: '/',
      LABEL: 'HOME',
      RESTRICTIONS: {
        SHOULD_BE_LOGGED_IN: false,
      },
    },
    MINTR: {
      TO: '/mintr',
      LABEL: 'MINTR',
      RESTRICTIONS: {
        SHOULD_BE_LOGGED_IN: false,
      },
    },
    SNX_SYNTH_SWAP: {
      TO: '/synthetic-assets-swap',
      LABEL: 'EXCHANGE',
      RESTRICTIONS: {
        SHOULD_BE_LOGGED_IN: false,
      },
    },
  };

  if (!userRestrictions) {
    return routes;
  } else {
    // Remove Restricted Routes
    return routes;
  }
}
