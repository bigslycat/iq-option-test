/* @flow */

export type Action = {
  type: 'LOAD_COUNTRIES_START',
};

export default
  (): Action =>
    ({ type: 'LOAD_COUNTRIES_START' });

