/* @flow */

import React from 'react';
import classNames from 'classnames';

export type Props = {
  isNative?: boolean,
  value?: string,
  children?: any,
};

export default
  ({ children, isNative = false, ...props }: $Exact<Props>) => (
    isNative ? (
      <option {...props} className="drop-down__item">{children}</option>
    ) : (
      <li
        {...props}
        className={classNames(
          'drop-down__item',
          typeof children === 'string' && 'drop-down__item_empty',
        )}
      >
        {children}
      </li>
    )
  );
