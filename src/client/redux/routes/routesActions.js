import { fetchRoute } from '@client/connectivity/routes/api.routes';
import { LOAD_ROUTE } from './routesReducer';

export function loadRoute(route) {
  return function(dispatch) {
    return fetchRoute(route)
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
