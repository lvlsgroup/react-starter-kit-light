import { fetchGlobals } from '@client/connectivity/globals/api.globals';
import { loadRoute } from '@client/redux/routes/routesActions';
import { handleApiError } from '../reduxUtils/reduxUtils';
import {
  LOAD_GLOBALS,
  selectLanguageCode,
  SET_LANGUAGE_CODE,
} from './globalsReducer';

export function loadGlobals() {
  return function(dispatch, getState) {
    const state = getState();
    const languageCode = selectLanguageCode(state);

    return fetchGlobals(languageCode)
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

export function setLanguageCode(languageCode) {
  return function(dispatch) {
    return dispatch({
      type: SET_LANGUAGE_CODE,
      payload: languageCode,
    });
  };
}

export function setLanguageCodeAndUpdate(languageCode) {
  return function(dispatch) {
    return dispatch(setLanguageCode(languageCode)).then(() => {
      // Update language affected reducers
      const promises = [dispatch(loadGlobals()), dispatch(loadRoute())];

      return Promise.all(promises);
    });
  };
}
