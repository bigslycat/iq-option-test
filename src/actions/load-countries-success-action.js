/* @flow */

import type { Country } from '../types';

export type Action = {
  type: 'LOAD_COUNTRIES_SUCCESS',
  payload: Country[],
};

export default
  (payload: Country[]): Action =>
    ({ type: 'LOAD_COUNTRIES_SUCCESS', payload });

