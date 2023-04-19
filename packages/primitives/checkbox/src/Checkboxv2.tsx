import type { CheckboxInputAttributes } from './checkboxv2.types';
import React from 'react';

export const Checkbox: React.FC<CheckboxInputAttributes> = props => {
  const { onChange, onClick, className, ...restProps } = props;

  return (
    <input
      {...restProps}
      className={className}
      onChange={onChange}
      onClick={onClick}
    />
  );
};
