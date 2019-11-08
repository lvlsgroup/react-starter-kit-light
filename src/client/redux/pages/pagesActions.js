import { fetchPageContent } from '@client/connectivity/api.pages';
import { LOAD_HOME_PAGE_DATA } from './pagesReducer';

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
      .catch(() => {});
  };
}
