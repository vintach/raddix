import React, { FC, PropsWithChildren } from 'react';
import './title.css';

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className='mark-sb-title'>{children}</h1>;
};
