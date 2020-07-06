import { imSetToObj } from '@client/shared/utils/immutableUtils/immutableUtils';

export const PAGES_REDUCER_KEY = 'pagesReducer';

export const LOAD_HOME_PAGE_DATA = 'LOAD_HOME_PAGE_DATA';
export const LOAD_HOME_PAGE_ERROR = 'LOAD_HOME_PAGE_ERROR';

let defaultState = {
  homePage: null,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_HOME_PAGE_DATA: {
      const payload = action.payload;
      const pageKey = action.pageKey;

      return imSetToObj(state, pageKey, payload);
    }
    default:
      return state;
  }
}

export const selectPage = (state, page) => {
  return state[PAGES_REDUCER_KEY][page];
};
