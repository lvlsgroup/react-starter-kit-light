import { imSetToObj } from '@lvlsgroup/react-component-lib/src/client/shared/utils/immutableUtils/immutableUtils';

export const GLOBALS_REDUCER_KEY = 'globalsReducer';

export const LOAD_GLOBALS = 'LOAD_GLOBALS';
export const SET_LANGUAGE_CODE = 'SET_LANGUAGE_CODE';

let defaultState = {
  languageCode: undefined,
  globals: null,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_GLOBALS: {
      return imSetToObj(state, 'globals', action.payload);
    }
    case SET_LANGUAGE_CODE: {
      return imSetToObj(state, 'languageCode', action.payload);
    }
    default:
      return state;
  }
}

export const selectGlobalsReducer = (state) => {
  return state[GLOBALS_REDUCER_KEY];
};

export const selectLanguageCode = (state) => {
  return selectGlobalsReducer(state)?.languageCode;
};

export const selectGlobals = (state) => {
  return selectGlobalsReducer(state)?.globals;
};

export const selectFooter = (state) => {
  return selectGlobals(state)?.footer;
};

export const selectMainNavbar = (state) => {
  return selectGlobals(state)?.mainNavbar;
};
