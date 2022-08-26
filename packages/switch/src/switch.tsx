import React, {
  ChangeEvent,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';
import { SwitchProvider, useSwitch } from './switch.provider';
import { SwitchProps, SwitchThumbProps } from './switch.types';
import { getChecked } from './switch.utils';

/*
 * Switch Root
 */

export const SwitchRoot = forwardRef<
  HTMLInputElement,
  PropsWithChildren<SwitchProps>
>((props, ref) => {
  const {
    checked,
    disabled,
    required,
    name,
    children,
    asChild: Component = 'button',
    ...rest
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    if (isChecked) return setIsChecked(false);
    if (!isChecked) return setIsChecked(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (checked === undefined) return;
    setIsChecked(checked);
  }, [checked]);

  return (
    <SwitchProvider checked={isChecked} disabled={disabled}>
      <Component
        type='button'
        role='switch'
        aria-checked={isChecked}
        aria-required={required}
        aria-disabled={disabled}
        data-state={getChecked(isChecked)}
        data-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Component>
      <input
        type='checkbox'
        aria-hidden
        defaultChecked={checked}
        checked={checked}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        name={name}
        style={{
          width: 1,
          height: 1,
          pointerEvents: 'none',
          opacity: 0,
          margin: 0
        }}
      />
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
