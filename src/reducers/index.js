/* @flow */

import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import type {
  Action as CountriesReducerAction,
  State as CountriesReducerState,
} from './countries-reducer';

import countries from './countries-reducer';

export type Action = CountriesReducerAction;

export type State = {
  countries: CountriesReducerState,
};

const state: Reducer<State, Action> = combineReducers({
  countries,
});

export default state;
