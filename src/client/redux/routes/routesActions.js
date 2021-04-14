import { fetchRoute } from '@client/connectivity/routes/api.routes';
import { selectLanguageCode } from '@client/redux/globals/globalsReducer';
import { LOAD_ROUTE } from './routesReducer';

export function loadRoute(route) {
  return function(dispatch, getState) {
    const state = getState();
    const languageCode = selectLanguageCode(state);

    return fetchRoute(route, languageCode)
      .then((response) => {
        return dispatch({
          type: LOAD_ROUTE,
          payload: response.data,
          reducerKey: route.reducerKey,
        });
      })
      .catch(() => {});
  };
}
