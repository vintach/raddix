import { ComponentPropsWithoutRef, ElementType } from 'react';

interface AriaCheckboxBase {
  'data-state'?: 'checked' | 'unchecked' | 'indeterminate';
  'data-disabled'?: boolean;
}
interface CheckboxState {
  checked?: boolean;
  indeterminate?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useCheckboxRoot
 * ------------------------------------------------------------------------------------------*/

type CheckboxRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaCheckboxBase & {};
type CheckboxRootHookProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> &
    CheckboxState & {
      /**
       * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
       * @default 'button'
       */
      elementType?: E;
    };
interface CheckboxResponse<E extends ElementType> {
  /** Props for the switch element. */
  checkboxProps: CheckboxRootProps<E>;
  /** Props for the selection state. */
  state: CheckboxState;
}
type CheckboxRootHook = <E extends ElementType = 'button'>(
  props: CheckboxRootHookProps<E>
) => CheckboxResponse<E>;

export const useCheckboxRoot = (props => {
  const { checked = false, indeterminate, elementType } = props;

  return {
    checkboxProps: {}
  };
}) as CheckboxRootHook;
