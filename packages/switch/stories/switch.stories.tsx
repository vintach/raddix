import React, { useState } from 'react';
import Switch from '../src';
import './switch.css';

export default {
  title: 'Components/Switch'
};

export const Default = () => (
  <Switch.Root className='switch'>
    <Switch.Thumb className='switch-thumb' />
  </Switch.Root>
);

export const DefaultChecked = () => {
  return (
    <Switch.Root className='switch' defaultChecked={true}>
      <Switch.Thumb className='switch-thumb' />
    </Switch.Root>
  );
};

export const Controlled = () => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <Switch.Root className='switch' checked={checked} onChecked={setChecked}>
      <Switch.Thumb className='switch-thumb' />
    </Switch.Root>
  );
};

export const Disabled = () => {
  return (
    <>
      <Switch.Root className='switch' disabled>
        <Switch.Thumb className='switch-thumb' />
      </Switch.Root>
    </>
  );
};

export const ReadOnly = () => {
  return (
    <>
      <Switch.Root className='switch' defaultChecked readOnly>
        <Switch.Thumb className='switch-thumb' />
      </Switch.Root>
    </>
  );
};

export const Label = () => {
  return (
    <div className='flex'>
      <label htmlFor='dev' className='label-switch'>
        Label
      </label>
      <Switch.Root className='switch' id='dev'>
        <Switch.Thumb className='switch-thumb' />
      </Switch.Root>
    </div>
  );
};
