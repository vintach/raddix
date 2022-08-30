import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { SwitchProvider, useSwitch } from './switch.provider';
import { SwitchProps, SwitchThumbProps } from './switch.types';
import { getChecked } from './switch.utils';

/*
 * Switch Root
 */
export const SwitchRoot = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<SwitchProps>
>((props, ref) => {
  const {
    checked: checkedProp,
    disabled,
    required,
    children,
    asChild: Component = 'button',
    ...rest
  } = props;

  const [checked, setChecked] = useState(checkedProp || false);

  const handleClick = () => {
    if (checked) return setChecked?.(false);
    if (!checked) return setChecked?.(true);
  };

  return (
    <SwitchProvider checked={checked} disabled={disabled}>
      <Component
        ref={ref}
        type='button'
        role='switch'
        aria-checked={checked}
        aria-required={required}
        aria-disabled={disabled}
        data-state={getChecked(checked)}
        data-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Component>
    </SwitchProvider>
  );
});

SwitchRoot.displayName = 'Switch';

/*
 * Switch Thumb
 */
export const SwitchThumb = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<SwitchThumbProps>
>((props, ref) => {
  const { children, ...rest } = props;

  const { checked, disabled } = useSwitch();

  return (
    <span
      ref={ref}
      data-state={getChecked(checked ?? false)}
      data-disabled={disabled}
      {...rest}
    >
      {children}
    </span>
  );
});

SwitchThumb.displayName = 'SwitchThumb';

const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb
};

export default Switch;
