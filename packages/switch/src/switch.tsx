import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { SwitchProvider, useSwitch } from './switch.provider';
import { SwitchProps, SwitchThumbProps, SwitchEvent } from './switch.types';
import { getChecked } from './switch.utils';

/*
 * Hook defines controlled or uncontrolled state
 */
const useControlledState = (options: SwitchEvent) => {
  const { checked, defaultChecked, onChecked } = options;
  const [inChecked, setInChecked] = useState<boolean | undefined>(
    defaultChecked
  );
  const isChecked = inChecked ?? false;

  if (checked !== undefined) {
    return [checked, onChecked] as const;
  } else {
    return [isChecked, setInChecked] as const;
  }
};

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
    defaultChecked,
    onChecked,
    asChild: Component = 'button',
    ...rest
  } = props;

  const [checked, setChecked] = useControlledState({
    checked: checkedProp,
    defaultChecked,
    onChecked
  });

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
