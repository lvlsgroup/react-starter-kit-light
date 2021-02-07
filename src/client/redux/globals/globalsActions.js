import { fetchGlobals } from '@client/connectivity/globals/api.globals';
import { handleApiError } from '../reduxUtils/reduxUtils';
import { LOAD_GLOBALS } from './globalsReducer';

export function loadGlobals() {
  return function(dispatch) {
    return fetchGlobals()
      .then((response) => {
        return dispatch({
          type: LOAD_GLOBALS,
          payload: response.data,
        });
      })
      .catch((error) => {
        return handleApiError(dispatch, error, LOAD_GLOBALS);
      });
  };
}
