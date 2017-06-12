/* @flow */

import fetch from 'isomorphic-fetch';
import { map, pipe, curryN } from 'ramda';

import type { Dispatch } from 'redux';

import type { Action as LoadCountriesStartAction } from './load-countries-start-action';
import type { Action as LoadCountriesSuccessAction } from './load-countries-success-action';
import type { Action as LoadCountriesErrorAction } from './load-countries-error-action';

import loadCountriesStartAction from './load-countries-start-action';
import loadCountriesSuccessAction from './load-countries-success-action';
import loadCountriesErrorAction from './load-countries-error-action';

const pipe2 = curryN(2, pipe);

const loadCountriesStart = pipe2(loadCountriesStartAction);
const loadCountriesSuccess = pipe2(loadCountriesSuccessAction);
const loadCountriesError = pipe2(loadCountriesErrorAction);

const responseHandle =
  (response: Response) => {
    if (response.status < 400) return response.json();

    throw new Error(`Bad response from server, code ${response.status}`);
  };

const rawCitiesFormat = pipe(
  (Object.entries: any),
  map(([code, name]) => ({ code, name })),
);

export type Action =
  LoadCountriesStartAction |
  LoadCountriesSuccessAction |
  LoadCountriesErrorAction;

export default
  (url: string): any =>
    (dispatch: Dispatch<Action>) => {
      loadCountriesStart(dispatch)();

      fetch(url)
        .then(responseHandle)
        .then(rawCitiesFormat)
        .then(loadCountriesSuccess(dispatch))
        .catch(loadCountriesError(dispatch));
    };

