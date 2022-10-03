import { ComponentPropsWithoutRef, ElementType } from 'react';

type ElementTypeProp<E extends ElementType> = {
  elementType?: E;
};

// Props key to omit
type PropsToOmit<E extends ElementType, Props> = keyof (ElementTypeProp<E> &
  Props);

export type PolymorphicHookProp<E extends ElementType, Props = {}> = Omit<
  ComponentPropsWithoutRef<E>,
  PropsToOmit<E, Props>
> &
  ElementTypeProp<E> &
  Props;

// This will return HTML props
type ElementProps<E extends ElementType, EProps = {}> = Omit<
  ComponentPropsWithoutRef<E>,
  keyof EProps
> &
  EProps;

export type HookResponse<E extends ElementType, Rpta = {}, EProps = {}> = {
  elementProps: ElementProps<E, EProps>;
} & Rpta;

// Type that ensures hooks behave well polymorphically
export type PolymorphicHook<
  D extends ElementType,
  // Props for the hook
  Props = {},
  // Props that are included outside the elementProps
  Rpta = {},
  // Props that are included inside the elementProps
  EProps = {}
> = <E extends ElementType = D>(
  props: PolymorphicHookProp<E, Props>
) => HookResponse<E, Rpta, EProps>;
