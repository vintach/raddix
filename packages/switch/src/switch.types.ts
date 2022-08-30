import { ComponentPropsWithoutRef, ElementType } from 'react';

interface DisabledProps {
  disabled?: boolean;
}

interface CheckedProps {
  checked?: boolean;
}

interface asProps {
  asChild?: React.ElementType<any>;
}

export type AttrsProps<T extends ElementType> =
  {} & ComponentPropsWithoutRef<T>;

export interface Props extends DisabledProps, CheckedProps {}

export interface SwitchEvent extends CheckedProps {
  defaultChecked?: boolean;
  onChecked?(checked: boolean): void;
}

export interface SwitchProps
  extends AttrsProps<'button'>,
    SwitchEvent,
    asProps {
  required?: boolean;
  readOnly?: boolean;
}

export interface SwitchThumbProps extends Props, AttrsProps<'span'>, asProps {}
