/* @flow */

import React from 'react';
import classNames from 'classnames';

export type Props = {
  htmlFor: string | null,
  isOpen: boolean,
  openDirection: 'up' | 'down',
  children?: any,
};

export default
  ({ isOpen = false, htmlFor, openDirection, children, ...props }: $Exact<Props>) => {
    const className = classNames(
      'drop-down__text-field-label',
      isOpen && `drop-down__text-field-label_open_${openDirection}`,
    );

    return htmlFor ?
      <label {...props} htmlFor={htmlFor} className={className}>{children}</label> :
      <div {...props} className={className}>{children}</div>;
  };

