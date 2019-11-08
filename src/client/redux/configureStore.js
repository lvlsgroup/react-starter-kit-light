import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';

export default function configureStore({ initialState, extraReducers }) {
  let middlewares = [thunkMiddleware];
  const appliedMiddleware = applyMiddleware(...middlewares);

  const injectedReducers = extraReducers || {};
  const rootReducer = createRootReducer(injectedReducers, initialState);

  const composer =
    !process.env.SERVER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composer(appliedMiddleware)
  );

  store.injectReducer = function injectReducer(reducerName, reducer) {
    if (typeof reducerName !== 'string' || typeof reducer !== 'function') {
      throw new Error(
        'Both a valid reducerName and a reducer must be supplied to the injectReducer-function'
      );
    }
    if (!injectedReducers[reducerName]) {
      injectedReducers[reducerName] = reducer;
      const rootReducer = createRootReducer(injectedReducers, initialState);
      store.replaceReducer(rootReducer);
    }
  };

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      const createNextRootReducer = require('./reducers').default;
      const nextRootReducer = createNextRootReducer(
        injectedReducers,
        initialState
      );
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
  };
}
