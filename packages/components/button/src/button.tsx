import { forwardRef } from 'react';
import { useButton } from './button.hooks';
import type { PolymorphicComponentWithRef } from '@mark-types/polymorphic';

export interface ButtonProps {
  isDisabled?: boolean;
  disabled?: boolean;
  onPress?: () => any;
  onPressStart?: () => any;
  onPressEnd?: () => any;
}

export type ButtonComponent = PolymorphicComponentWithRef<
  'button',
  ButtonProps
>;

export const Button = forwardRef((props, ref) => {
  const { children, as, onPress, onPressStart, onPressEnd, ...rest } = props;

  const Component = as || 'button';

  const { elementProps } = useButton({
    elementType: Component,
    ...rest
  });

  return (
    <Component ref={ref} {...elementProps}>
      {children}
    </Component>
  );
}) as ButtonComponent;

Button.displayName = 'Button';

export default Button;
