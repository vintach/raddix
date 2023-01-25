import { ComponentPropsWithoutRef, ElementType } from 'react';

/* -------------------------------------------------------------------------------------------
 * Global Types
 * ------------------------------------------------------------------------------------------*/

interface Checked {
  /**
   * The checkbox will be checked if true (controlled).
   * @default false
   */
  checked?: boolean;
}
interface Disabled {
  /**
   * The checkbox will be disabled if true (but can still be focused).
   * @default false
   */
  disabled?: boolean;
  /**
   * The checkbox will be disabled if true (but not focusable).
   * @default false
   */
  isDisabled?: boolean;
}
interface Indeterminate {
  /**
   * The checkbox will be indeterminate if true (does not modify the value of the checked property)
   * @default false
   */
  indeterminate?: boolean;
}
export type AriaChecked = boolean | 'mixed';
export type Booleanish = boolean | 'true' | 'false';

export interface CheckedOptions extends Checked {
  /**
   * The checkbox will be checked if true (uncontrolled).
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Event to update the value checked property.
   */
  onChecked?(checked: boolean): void;
}

export interface IndeterminateOptions extends Indeterminate {
  /**
   * Event to update the value indeterminate property.
   */
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

export interface DataAttrCheckbox {
  'data-checked'?: Booleanish;
  'data-indeterminate'?: Booleanish;
  'data-disabled'?: Booleanish;
}
export interface AriaAttrCheckbox {
  role: 'checkbox';
  'aria-checked'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useCheckboxRoot Types
 * ------------------------------------------------------------------------------------------*/

type CheckboxRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaAttrCheckbox &
  DataAttrCheckbox;
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
export type CheckboxRootHook = <E extends ElementType = 'button'>(
  props: CheckboxRootHookProps<E>
) => CheckboxResponse<E>;

/* -------------------------------------------------------------------------------------------
 * useCheckboxIndicator Types
 * ------------------------------------------------------------------------------------------*/

type CheckboxIndicatorProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> & DataAttrCheckbox;
interface CheckboxIndicator<E extends ElementType> {
  /** Props for the switch element. */
  checkboxIndicatorProps: CheckboxIndicatorProps<E>;
}

type UseCheckboxIndicatorProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> &
    CheckboxState & {
      /**
       * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
       * @default 'span'
       */
      elementType?: E;
    };
export type UseCheckboxIndicator = <E extends ElementType = 'span'>(
  props: UseCheckboxIndicatorProps<E>
) => CheckboxIndicator<E>;
