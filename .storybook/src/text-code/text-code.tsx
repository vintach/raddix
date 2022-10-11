import React, { FC, PropsWithChildren } from 'react';
import './text-code.css';

export const TextCode: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <code className='text-code' {...props}>
      {children}
    </code>
  );
};
