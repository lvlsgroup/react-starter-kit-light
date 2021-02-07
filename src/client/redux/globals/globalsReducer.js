import { imSetToObj } from '@lvlsgroup/react-component-lib/src/client/shared/utils/immutableUtils/immutableUtils';

export const GLOBALS_REDUCER_KEY = 'globalsReducer';

export const LOAD_GLOBALS = 'LOAD_GLOBALS';

let defaultState = {
  currentLanguage: undefined,
  globals: null,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case LOAD_GLOBALS: {
      return imSetToObj(state, 'globals', action.payload);
    }
    default:
      return state;
  }
}

export const selectGlobals = (state) => {
  return state[GLOBALS_REDUCER_KEY].globals;
};

export const selectFooter = (state) => {
  return selectGlobals(state)?.footer;
};

export const selectMainNavbar = (state) => {
  return selectGlobals(state)?.mainNavbar;
};

export const selectCurrentLanguage = (state) => {
  return state[GLOBALS_REDUCER_KEY].currentLanguage;
};
