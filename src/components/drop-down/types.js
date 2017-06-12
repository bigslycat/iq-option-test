/* @flow */

export type DataItem = {
  id: string,
  name: string,
};

export type Data = {
  status: 'LOADED',
  payload: DataItem[],
} | {
  status: 'FAIL',
  error: Error,
} | {
  status: 'LOADING',
} | {
  status: 'NOT_LOADED',
};
