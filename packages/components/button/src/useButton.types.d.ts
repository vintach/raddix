import { DOMHoverEvents, HoverProps } from '@mark-hooks/usehover';
import { DOMPressEvents, PressProps } from '@mark-hooks/usepress';
import { ComponentPropsWithoutRef, ElementType } from 'react';

export type ButtonHookProps<E extends ElementType> = {
  elemetType?: E;
  isDisabled?: boolean;
  disabled?: boolean;
} & ComponentPropsWithoutRef<E> &
  Omit<HoverProps, 'disabled'> &
  Omit<PressProps, 'disabled'>;

type OmitProps =
  | 'isDisabled'
  | 'disabled'
  | 'elemetType'
  | 'onPress'
  | 'onPressEnd'
  | 'onPressStart'
  | 'onHover'
  | 'onHoverEnd'
  | 'onHoverStart';

type ButtonProps<E extends ElementType> = Omit<ButtonHookProps<E>, OmitProps> &
  DOMHoverEvents &
  DOMPressEvents;

export type ButtonResponse<E extends ElementType> = {
  buttonProps: ButtonProps<E>;
};

export type ButtonHook = <E extends ElementType = 'button'>(
  props: ButtonHookProps<E>
) => ButtonResponse<E>;
