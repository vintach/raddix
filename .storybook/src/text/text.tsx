import React, { FC, PropsWithChildren } from 'react';
import './text.css';

export const Text: FC<PropsWithChildren> = ({ children }) => {
  return <p className='mark-sb-text'>{children}</p>;
};
