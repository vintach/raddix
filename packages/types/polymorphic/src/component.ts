import {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement
} from 'react';

type AsProp<E extends ElementType> = {
  as?: E;
};

// Props key to omit
type PropsToOmit<E extends ElementType, Props> = keyof (AsProp<E> & Props);

export type PolymorphicComponentProp<
  E extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<E>> &
  Omit<ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>>;

// Type that ensures strongly typed polymorphic props without Ref(forwardRef)
export type PolymorphicComponent<D extends ElementType, Props = {}> = <
  E extends ElementType = D
>(
  props: PolymorphicComponentProp<E, Props>
) => ReactElement | null;
