import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
//importing the root reducer from root-reducer
import rootReducer from './root-reducer';

import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

//adding middlewares into their own array for later to spread on the store
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// starting the store with the root reducer and middleware
export const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
