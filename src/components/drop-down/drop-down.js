/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

import type { DataItem, Data } from './types';

import Popover from './__popover/drop-down__popover';
import TextField from './__text-field/drop-down__text-field';
import Item from './__item/drop-down__item';
import TextFieldLabel from './__text-field-label/drop-down__text-field-label';

export type Props = {
  label: string,
  data: Data,
  onChange?: (DataItem | null) => any,
};

export type DefaultProps = {
  data: { status: 'NOT_LOADED' },
};

export type State = {
  text: string,
  isOpen: boolean,
  openDirection: 'up' | 'down',
  autoComplete: DataItem[],
  selected: null | DataItem,
  popoverSize: number,
  isTouch: boolean,
};

export default class DropDown extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    data: { status: 'NOT_LOADED' },
  };

  static isTouch = (): boolean => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }

  static compareItems =
    ({ name: name1Raw }: DataItem, { name: name2Raw }: DataItem) => {
      const name1 = name1Raw[0].toUpperCase() + name1Raw.slice(1);
      const name2 = name2Raw[0].toUpperCase() + name2Raw.slice(1);

      if (name1 < name2) return -1;
      if (name1 > name2) return 1;
      return 0;
    };

  constructor(props: Props) {
    super(props);

    const text = '';

    this.state = {
      text,
      isOpen: false,
      openDirection: 'down',
      autoComplete: this.getCountries(props, text),
      selected: null,
      popoverSize: 400,
      isTouch: this.constructor.isTouch(),
    };
  }

  state: State;

  componentDidMount() {
    if (this.state.isTouch) return;

    this.handleScrollResize();
    window.addEventListener('scroll', this.handleScrollResize);
    window.addEventListener('resize', this.handleScrollResize);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data.status !== this.props.data.status) {
      this.setState((prevState: State) => ({
        autoComplete: this.getCountries(nextProps, prevState.text),
      }));
    }
  }

  componentWillUnmount() {
    if (this.state.isTouch) return;

    window.removeEventListener('scroll', this.handleScrollResize);
    window.removeEventListener('resize', this.handleScrollResize);
  }

  getCountries(props: Props, text: string): DataItem[] {
    if (props.data.status !== 'LOADED') return [];

    const sorted = [...props.data.payload].sort(this.constructor.compareItems);

    if (!text || this.state.isTouch) return sorted;

    return sorted.filter(
      ({ name }) => new RegExp(`^${text}`, 'gi').test(name),
    );
  }

  getLabel() {
    switch (this.props.data.status) {
      case 'NOT_LOADED': return 'Данные не загружены';
      case 'LOADING': return 'Данные загружаются';
      case 'FAIL': return 'Ошибка загрузки данных';
      case 'LOADED': return this.props.label;

      default:
        /**
         * Если забыть указать один из кейсов, то он попадёт в дефолтный и на него кастанётся
         * empty, что приведёт к ошибке Flow, т.к. строка несовместима с empty.
         */
        (this.props.data.status: empty);
        throw RangeError('Ты втираешь мне какую-то дичь');
    }
  }

  wrapperDiv: HTMLDivElement;
  closeTimeout: number;

  handleInput = ({ target: { value: text } }: any) =>
    this.setState({ text, autoComplete: this.getCountries(this.props, text) });

  handleFocus = () => this.setState({ isOpen: true });
  handleBlur = () => { this.closeTimeout = setTimeout(this.close, 100) };
  close = () => {
    const text =
      this.state.selected && this.state.text ?
        this.state.selected.name : '';

    this.setState({
      text,
      isOpen: false,
      selected: this.state.text ? this.state.selected : null,
      autoComplete: this.getCountries(this.props, text),
    });

    if (!this.state.text) this.emitChange(null);
  };

  handleScrollResize = () => {
    const { scrollY, innerHeight } = window;
    const { offsetTop, offsetHeight } = this.wrapperDiv;
    const { popoverSize } = this.state;

    const toTop = offsetTop - scrollY;
    const toBottom = innerHeight - (toTop + offsetHeight);

    this.setState({
      openDirection: toTop > toBottom && popoverSize > toBottom ? 'up' : 'down',
    });
  };

  handleRef = (div: HTMLDivElement) => { this.wrapperDiv = div };

  handleSelect = (item: DataItem) => () => {
    clearTimeout(this.closeTimeout);

    this.setState({
      selected: item,
      text: item.name,
      isOpen: false,
      autoComplete: this.getCountries(this.props, item.name),
    });

    this.emitChange(item);
  };

  handleSelectNative = ({ target: { value: itemId } }: any) => {
    if (this.props.data.status !== 'LOADED') return;

    const selected = this.props.data.payload.filter(({ id }) => id === itemId)[0] || null;

    this.setState({ selected });
    this.emitChange(selected);
  };

  emitChange(item: DataItem | null) { this.props.onChange && this.props.onChange(item) }

  render() {
    const inputId = 'input';
    const {
      isOpen, openDirection, autoComplete,
      popoverSize, text, selected, isTouch,
    } = this.state;

    const { data } = this.props;

    const isLoaded = data.status === 'LOADED';

    return isTouch ? (
      <select
        value={this.state.selected ? this.state.selected.id : 'default'}
        onChange={this.handleSelectNative}
        className={classNames(
          'drop-down',
          'drop-down_is-native',
        )}
      >
        <Item isNative value="default">{this.getLabel()}</Item>
        {this.state.autoComplete.map(
          ({ id, name }) => <Item key={id} isNative value={id}>{name}</Item>,
        )}
      </select>
    ) : (
      <div
        ref={this.handleRef}
        className={classNames(
          'drop-down',
          isOpen && `drop-down_open_${openDirection}`,
        )}
      >
        {!selected && (
          <TextFieldLabel
            htmlFor={isLoaded ? inputId : null}
            isOpen={isOpen}
            openDirection={openDirection}
          >
            {this.getLabel()}
          </TextFieldLabel>
        )}

        {isLoaded && <TextField
          id={inputId}
          value={
            (selected && !isOpen && selected.name) ||
            this.state.text
          }
          onChange={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />}

        <Popover
          countries={autoComplete}
          direction={this.state.openDirection}
          requestLength={text.length}
          style={{ maxHeight: `${popoverSize}px` }}
          onSelect={this.handleSelect}
          isOpen={isOpen && isLoaded}
        />
      </div>
    );
  }
}
