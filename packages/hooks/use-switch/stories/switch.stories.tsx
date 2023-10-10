import type { Meta, StoryObj } from '@storybook/react';
import type { UseSwitchProps } from '../src';
import { useSwitch } from '../src';
import './switch.css';

export const Switch = (props: UseSwitchProps) => {
  const { switchProps, dataProps } = useSwitch({
    as: 'button',
    ...props
  });

  return (
    <button {...switchProps} {...dataProps} className='switch'>
      <span {...dataProps} className='switch-thumb'></span>
    </button>
  );
};

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'useSwitch'
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const ReadOnly: Story = {
  args: {
    checked: true,
    readOnly: true
  }
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true
  }
};
