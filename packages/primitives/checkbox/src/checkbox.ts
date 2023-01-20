import { ComponentPropsWithoutRef, ElementType, useState } from 'react';

type Checked = { checked?: boolean };
type Disabled = { disabled?: boolean; isDisabled?: boolean };
type Indeterminate = { indeterminate?: boolean };

interface CheckedOptions extends Checked {
  defaultChecked: boolean;
  onChecked?(checked: boolean): void;
}

interface IndeterminateOptions extends Indeterminate {
  onIndeterminate?(indeterminate: boolean): void;
}

export interface CheckboxState extends Checked, Indeterminate, Disabled {}

export interface CheckboxRootBase
  extends CheckedOptions,
    IndeterminateOptions,
    Disabled {
  required?: boolean;
  readOnly?: boolean;
}

interface DataAttrCheckbox {
  'data-state'?: 'checked' | 'unchecked' | 'indeterminate';
  'data-disabled'?: boolean;
}
interface AriaAttrCheckbox extends DataAttrCheckbox {
  'aria-checked'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useChecked
 * Hook defines checked or unchecked state
 * ------------------------------------------------------------------------------------------*/
const useChecked = (options: CheckedOptions) => {
  const { checked, defaultChecked, onChecked } = options;
  const [inChecked, setInChecked] = useState<boolean | undefined>(
    defaultChecked
  );
  const isChecked = inChecked ?? false;

  if (checked !== undefined) {
    return [checked, onChecked] as const;
  } else {
    return [isChecked, setInChecked] as const;
  }
};

/* -------------------------------------------------------------------------------------------
 * useCheckboxRoot
 * ------------------------------------------------------------------------------------------*/

type CheckboxRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaAttrCheckbox & {};
type CheckboxRootHookProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> &
    CheckboxRootBase & {
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

const useCheckbox = {
  Root: useCheckboxRoot
};

export default useCheckbox;
