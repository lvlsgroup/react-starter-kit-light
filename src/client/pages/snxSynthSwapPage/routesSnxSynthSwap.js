import universal from 'react-universal-component';
import ErrorLoadingRouteChunk from '@lvlsgroup/react-component-lib/src/client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';
import Loader from '@client/components/loader/Loader';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: Loader,
};

export const ROUTES_SNX_SYNTH_SWAP = [
  {
    path: '/snx-synth-swap',
    exact: false,
    label: 'EXCHANGE',
    componentPath: 'pages/snxSynthSwapPage/SnxSynthSwapPage',
    Component: universal(
      import('pages/snxSynthSwapPage/SnxSynthSwapPage'),
      options
    ),
  },
  {
    path: '/snx-synth-swap/history',
    exact: true,
    label: 'HISTORY',
    componentPath:
      'pages/snxSynthSwapPage/snxSynthSwapHistoryRoute/SnxSynthSwapHistoryRoute',
    Component: universal(
      import(
        '@client/pages/snxSynthSwapPage/snxSynthSwapHistoryRoute/SnxSynthSwapHistoryRoute'
      ),
      options
    ),
  },
  {
    path: '/snx-synth-swap/synths',
    exact: true,
    label: 'SYNTHS',
    componentPath:
      'pages/snxSynthSwapPage/snxSynthSwapListingRoute/SnxSynthSwapListingRoute',
    Component: universal(
      import(
        'pages/snxSynthSwapPage/snxSynthSwapListingRoute/SnxSynthSwapListingRoute'
      ),
      options
    ),
  },
];
