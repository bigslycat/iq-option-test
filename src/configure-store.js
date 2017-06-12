/* @flow */

import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';

import stateReduser from './reducers';
import type { State, Action } from './reducers';

export default
  (initialState?: State): Store<State, Action> => {
    const thunkMiddleware = applyMiddleware(thunk);
    const store: Store<State, Action> =
      initialState ?
        createStore(stateReduser, initialState, thunkMiddleware) :
        createStore(stateReduser, thunkMiddleware);

    if (module.hot && typeof module.hot.accept === 'function') {
      module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const nextStateReducer = require('./reducers').default;
        store.replaceReducer(nextStateReducer);
      });
    }

    return store;
  };
