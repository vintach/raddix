import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes
} from 'react';

export type AttrsProps<T extends ElementType> =
  {} & ComponentPropsWithoutRef<T>;

export interface SwitchPropsBase {
  checked?: boolean;
  disabled?: boolean;
}

export type BtnAttrs = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type SwitchProps = SwitchPropsBase &
  AttrsProps<'button'> & {
    asChild?: React.ElementType<any>;
    name?: string;
    required?: boolean;
    immois?: boolean;
  };

export interface SwitchThumbBaseProps {
  checked?: boolean;
  disabled?: boolean;
}

export type SpanAttrs = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type SwitchThumbProps = SwitchThumbBaseProps & SpanAttrs;
