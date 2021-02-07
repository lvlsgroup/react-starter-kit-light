import { combineReducers } from 'redux';
import globalsReducer, {
  GLOBALS_REDUCER_KEY,
} from '@client/redux/globals/globalsReducer';
import routesReducer, {
  ROUTES_REDUCER_KEY,
} from '@client/redux/routes/routesReducer';

export default function createRootReducer(injectedReducers = {}, initialState) {
  const reducers = {
    [ROUTES_REDUCER_KEY]: routesReducer,
    [GLOBALS_REDUCER_KEY]: globalsReducer,
    ...injectedReducers,
  };

  // If initialState contains state we have not loaded the reducer-code for yet,
  // make sure we preserve that state by creating an empty reducer for it
  if (initialState) {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach((initialStateKey) => {
      if (reducerNames.indexOf(initialStateKey) === -1) {
        reducers[initialStateKey] = (state = null) => state;
      }
    });
  }

  return combineReducers(reducers);
}
