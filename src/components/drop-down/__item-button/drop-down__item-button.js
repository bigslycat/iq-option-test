/* @flow */

import React from 'react';

export type Props = {
  onClick: () => any,
  children?: any,
};

export default
  ({ children, ...props }: $Exact<Props>) =>
    <button {...props} className="drop-down__item-button">{children}</button>;
