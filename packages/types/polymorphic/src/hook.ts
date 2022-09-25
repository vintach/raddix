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
type NativeHTMLProps<E extends ElementType, Props> = Omit<
  PolymorphicHookProp<E, Props>,
  PropsToOmit<E, Props>
>;

export type HookResponse<E extends ElementType, Props = {}> = {
  elementProps: NativeHTMLProps<E, Props>;
};

// Type that ensures hooks behave well polymorphically
export type PolymorphicHook<D extends ElementType, Props = {}> = <
  E extends ElementType = D
>(
  props: PolymorphicHookProp<E, Props>
) => HookResponse<E, Props>;
