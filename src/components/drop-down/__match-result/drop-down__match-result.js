/* @flow */

import React from 'react';

export type Props = {
  children?: any,
};

export default
  ({ children }: $Exact<Props>) =>
    <b className="drop-down__match-result">{children}</b>;
