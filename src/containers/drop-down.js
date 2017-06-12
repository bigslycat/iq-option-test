/* @flow */

import { connect } from 'react-redux';

import DropDown from '../components/drop-down';

import type { State } from '../reducers';

export default
  connect(
    ({ countries }: State) => ({
      data: countries.status === 'LOADED' ? {
        ...countries,
        payload: countries.payload.map(({ code, name }) => ({ id: code, name })),
      } : countries,
    }),
  )(DropDown);
