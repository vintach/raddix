import { ComponentPropsWithoutRef, ElementType } from 'react';

export type AttrsProps<T extends ElementType> =
  {} & ComponentPropsWithoutRef<T>;

export interface ButtonProps extends AttrsProps<'button'> {
  asChild?: React.ElementType<any>;
  isDisabled?: boolean;
  onPress?: () => any;
  onPressStart?: () => any;
  onPressEnd?: () => any;
}
