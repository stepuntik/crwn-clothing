import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = store => next => action => {
  if (!action.type) {
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  next(action);

  console.log('next state', store.getState());
};

// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//   Boolean
// );

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(
  applyMiddleware(...middleWares),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : [])
);

export const store = createStore(rootReducer, undefined, composedEnhancers);
