import React, { FC, PropsWithChildren } from 'react';
import './subtitle.css';

export const SubTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className='mark-sb-subtitle'>{children}</h2>;
};
