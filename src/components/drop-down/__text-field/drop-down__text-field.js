/* @flow */

import React from 'react';

export type Props = {
  id: string,
  value: string,
  onChange: () => any,
  onFocus: () => any,
  onBlur: () => any,
};

export default
  (props: $Exact<Props>) => (
    <input {...props} className="drop-down__text-field" />
  );
