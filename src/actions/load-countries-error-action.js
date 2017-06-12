/* @flow */

export type Action = {
  type: 'LOAD_COUNTRIES_ERROR',
  payload: Error,
};

export default
  (payload: Error): Action =>
    ({ type: 'LOAD_COUNTRIES_ERROR', payload });

