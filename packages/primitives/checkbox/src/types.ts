import type { ComponentPropsWithoutRef, ElementType } from 'react';

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
   * The checkbox will be disabled if true.
   * @default false
   */
  disabled?: boolean;
}
interface Indeterminate {
  /**
   * The checkbox will be indeterminate if true (does not modify the value of the checked property)
   * @default false
   */
  indeterminate?: boolean;
}
export type AriaChecked = boolean | 'mixed';
export type Booleanish = '' | undefined;

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

export interface UseCheckboxProps
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
 * useCheckbox Types
 * ------------------------------------------------------------------------------------------*/

type CheckboxProps<E extends ElementType> = UseCheckboxProps &
  Omit<ComponentPropsWithoutRef<E>, keyof UseCheckboxProps>;

export type UseProps<E extends ElementType> = UseCheckboxProps & {
  /**
   * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
   * @default 'div'
   */
  as?: E;
};
interface CheckboxResponse<E extends ElementType> {
  /** Props for the switch element. */
  checkboxProps: CheckboxProps<E>;
  dataProps: DataAttrCheckbox;
  /** Props for the selection state. */
  state: CheckboxState;
}

export type UseCheckbox = <E extends ElementType = 'div'>(
  props: UseProps<E>
) => CheckboxResponse<E>;
