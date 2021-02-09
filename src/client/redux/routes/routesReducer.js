import { imSetToObj } from '@lvlsgroup/react-component-lib/src/client/shared/utils/immutableUtils/immutableUtils';

export const ROUTES_REDUCER_KEY = 'routesReducer';

export const LOAD_ROUTE = 'LOAD_ROUTE';

let defaultState = {
  errorMessage: null,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_ROUTE: {
      const payload = action.payload;
      const reducerKey = action.reducerKey;

      return imSetToObj(state, reducerKey, payload);
    }
    default:
      return state;
  }
}

export const selectRoute = (state, page) => {
  const routeData = state[ROUTES_REDUCER_KEY][page];

  return state[ROUTES_REDUCER_KEY][page];
};
