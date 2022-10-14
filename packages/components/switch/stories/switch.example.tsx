import { ComponentPropsWithoutRef } from 'react';
import useSwitch, { SwitchRootHookProps } from '@raddix/switch';
import './switch.css';

interface SwitchProps
  extends ComponentPropsWithoutRef<'button'>,
    SwitchRootHookProps {}

export const Switch = (props: SwitchProps) => {
  const { elementProps, state } = useSwitch.Root(props);
  const { elementProps: switchThumbProps } = useSwitch.Thumb(state);

  return (
    <button className='switch' {...elementProps}>
      <span className='switch-thumb' {...switchThumbProps}></span>
    </button>
  );
};
