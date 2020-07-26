/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhance =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose;

const store = createStore(rootReducer, composeEnhance(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSagas);

export default store;
