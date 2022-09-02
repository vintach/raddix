import React, {
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useRef
} from 'react';
import { ButtonProps } from './button.types';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const {
    children,
    disabled: disabledProp,
    isDisabled,
    asChild,
    ...rest
  } = props;

  const Component = asChild || 'button';
  const disabled = isDisabled ?? disabledProp;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (disabled) {
      e.preventDefault();
      return;
    }
  };

  return (
    <button
      ref={buttonRef}
      aria-disabled={disabledProp}
      data-disabled={disabled}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
