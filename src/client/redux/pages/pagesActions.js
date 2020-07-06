import { fetchPageContent } from '@client/connectivity/api.pages';
import { handleApiError } from '../reduxUtils/reduxUtils';
import { LOAD_HOME_PAGE_DATA, LOAD_HOME_PAGE_ERROR } from './pagesReducer';

export function loadPage(page) {
  return function(dispatch) {
    return fetchPageContent(page)
      .then((response) => {
        return dispatch({
          type: LOAD_HOME_PAGE_DATA,
          payload: response.data,
          pageKey: page,
        });
      })
      .catch((error) => {
        return handleApiError(dispatch, error, LOAD_HOME_PAGE_ERROR);
      });
  };
}
