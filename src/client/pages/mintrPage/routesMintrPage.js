import universal from 'react-universal-component';
import ErrorLoadingRouteChunk from '@lvlsgroup/react-component-lib/src/client/containers/errorLoadingRouteChunk/ErrorLoadingRouteChunk';
import Loader from '@client/components/loader/Loader';

const options = {
  error: ErrorLoadingRouteChunk,
  loading: Loader,
};

// Probably better
export const ROUTES_SNX_SYNTH_SWAP = [
  {
    path: `/mintr/:synthPair?`,
    exact: true,
    to: '/synthetic-assets-swap/seth-susd',
    label: 'EXCHANGE',
    componentPath: 'pages/snxSynthSwapPage/SnxSynthSwapPage',
    Component: universal(
      import('pages/snxSynthSwapPage/SnxSynthSwapPage'),
      options
    ),
  },
];
