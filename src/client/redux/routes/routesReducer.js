import { imSetToObj } from '@lvlsgroup/react-component-lib/src/client/shared/utils/immutableUtils/immutableUtils';
import { selectGlobals } from '@client/redux/globals/globalsReducer';
import {
  imArrayMergeNoDuplicates,
  imMergeObj,
} from '@client/shared/utils/generalUtils/immutableUtils/immutableUtils';

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

export const selectRoutesReducer = (state) => {
  return state[ROUTES_REDUCER_KEY];
};

export const selectRoute = (state, route) => {
  const globals = selectGlobals(state);
  const routeData = selectRoutesReducer(state)[route];

  const metaTags = imArrayMergeNoDuplicates(
    globals?.metaTags,
    routeData?.metaTags
  );

  const actionLabels = imMergeObj(
    globals?.actionLabels,
    routeData?.actionLabels
  );

  return imMergeObj(routeData, { metaTags, actionLabels });
};
