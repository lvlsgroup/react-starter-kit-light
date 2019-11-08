import { combineReducers } from 'redux';
import pagesReducer, {
  PAGES_REDUCER_KEY,
} from '@client/redux/pages/pagesReducer';

export default function createRootReducer(injectedReducers = {}, initialState) {
  const reducers = {
    [PAGES_REDUCER_KEY]: pagesReducer,
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
