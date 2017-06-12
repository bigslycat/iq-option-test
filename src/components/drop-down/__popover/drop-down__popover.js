/* @flow */

import React from 'react';
import classNames from 'classnames';
import { curryN } from 'ramda';

import type { DataItem } from '../types';

import Item from '../__item/drop-down__item';
import Button from '../__item-button/drop-down__item-button';
import Match from '../__match-result/drop-down__match-result';

type OnSelect = (item: DataItem) => () => any;

export type Props = {
  countries: DataItem[],
  direction?: 'up' | 'down',
  requestLength: number,
  isOpen?: boolean,
  style: { [prop: string]: string | number | false },
  onSelect: OnSelect,
};

const getItemList = curryN(
  3, (onSelect: OnSelect, requestLength: number, item: DataItem) => (
    <Item key={item.id}>
      <Button onClick={onSelect(item)}>
        {!!requestLength && <Match>{item.name.slice(0, requestLength)}</Match>}
        {item.name.slice(requestLength)}
      </Button>
    </Item>
  ),
);

export default
  ({ countries, isOpen, requestLength, direction = 'down', onSelect, ...props }: $Exact<Props>) => (
    <ul
      {...props}
      className={classNames(
        'drop-down__popover',
        `drop-down__popover_direction_${direction}`,
        isOpen && 'drop-down__popover_is-open',
      )}
    >
      {countries.length ?
        countries.map(getItemList(onSelect, requestLength)) :
        <Item>
          Нет совпадений
        </Item>}
    </ul>
  );
