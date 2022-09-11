import { forwardRef, PropsWithChildren } from 'react';
import { ButtonProps } from './button.types';
import { useButton } from './useButton';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const {
    children,
    disabled,
    isDisabled,
    asChild,
    onPress,
    onPressStart,
    onPressEnd,
    ...rest
  } = props;

  const Component = asChild || 'button';

  const { buttonProps } = useButton({
    disabled,
    isDisabled
  });

  return (
    <Component ref={ref} {...buttonProps}>
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
