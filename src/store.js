/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { LOGOUT } from 'services/user/constants';
import rootReducer from './reducer';
import rootSagas from './sagas';

// eslint-disable-next-line import/no-mutable-exports
let store = null;

const errorHook = (error) => {
  const status = error?.response?.header?.status;
  if (status === 401) {
    store.dispatch({
      type: LOGOUT,
    });
  }
};

const sagaOptions = {
  onError: errorHook,
};

const sagaMiddleware = createSagaMiddleware(sagaOptions);

const composeEnhance =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

store = createStore(rootReducer, composeEnhance(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSagas);

export default store;
