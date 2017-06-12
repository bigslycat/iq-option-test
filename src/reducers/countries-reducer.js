/* @flow */

import type { Country } from '../types';
import type { Action as LoadCountriesAction } from '../actions/load-countries-action';

export type Action = LoadCountriesAction;

export type State = {
  status: 'LOADED',
  payload: Country[],
} | {
  status: 'FAIL',
  error: Error,
} | {
  status: 'LOADING',
} | {
  status: 'NOT_LOADED',
};

const initState = () => ({ status: 'NOT_LOADED' });

export default
  (state: State = initState(), action: Action): State => {
    switch (action.type) {
      case 'LOAD_COUNTRIES_START': return { status: 'LOADING' };
      case 'LOAD_COUNTRIES_ERROR': return { status: 'FAIL', error: action.payload };
      case 'LOAD_COUNTRIES_SUCCESS': return { status: 'LOADED', payload: action.payload };

      default:
        (action: empty);
        return state;
    }
  };
