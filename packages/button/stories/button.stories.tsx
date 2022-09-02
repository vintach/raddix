import React, { useState } from 'react';
import Button from '../src';
import './button.css';

export default {
  title: 'Components/Button'
};

export const Base = () => <Button className='button'>Get Started</Button>;

export const Disabled = () => {
  return (
    <>
      <Button className='button' disabled>
        Get Started
      </Button>
    </>
  );
};

export const IsDisabled = () => {
  return (
    <>
      <Button className='button' isDisabled>
        Get Started
      </Button>
    </>
  );
};
