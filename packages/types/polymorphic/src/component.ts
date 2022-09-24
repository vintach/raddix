import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ForwardRefExoticComponent,
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

export type PolymorphicRef<E extends ElementType> =
  ComponentPropsWithRef<E>['ref'];

export type PolymorphicComponentPropWithRef<
  E extends ElementType,
  Props = {}
> = PolymorphicComponentProp<E, Props> & { ref?: PolymorphicRef<E> };

export type PolymorphicExoticComponent<
  E extends React.ElementType,
  Props
> = ForwardRefExoticComponent<PolymorphicComponentPropWithRef<E, Props>>;

// Type polymorphic for component with ref
export interface PolymorphicComponentWithRef<D extends ElementType, Props = {}>
  extends PolymorphicExoticComponent<D, Props> {
  <E extends React.ElementType = D>(
    props: PolymorphicComponentPropWithRef<E, Props>
  ): React.ReactElement | null;
}
