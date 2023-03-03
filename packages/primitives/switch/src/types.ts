import { ComponentPropsWithoutRef, ElementType } from 'react';

/* -------------------------------------------------------------------------------------------
 * Global Types
 * ------------------------------------------------------------------------------------------*/

export type Booleanish = boolean | 'true' | 'false';

interface Checked {
  /**
   * switch is on if true  (controlled).
   * @default false
   */
  checked?: boolean;
}

interface Disabled {
  /**
   * switch is disabled if true (but can still be focused).
   * @default false
   */
  disabled?: boolean;
  /**
   * switch is disabled if true (but not focusable).
   * @default false
   */
  isDisabled?: boolean;
}

export interface CheckedOptions extends Checked {
  /**
   * Tswitch is on if true (uncontrolled).
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * Event to update the value checked property.
   */
  onChecked?(checked: boolean): void;
}

export interface SwitchOptions {
  /**
   * Return data attributes on those components that have a state
   * @default true
   */
  dataAttr?: boolean;
}

export interface SwitchState extends Checked, Disabled {}

export interface SwitchRootBase extends CheckedOptions, Disabled {
  required?: boolean;
  readOnly?: boolean;
}

export interface DataAttrSwitch {
  'data-state'?: 'checked' | 'unchecked';
  'data-disabled'?: Booleanish;
}
export interface AriaAttrSwitch {
  role: 'switch';
  'aria-checked'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useSwitchRoot Types
 * ------------------------------------------------------------------------------------------*/

type SwitchRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  DataAttrSwitch &
  AriaAttrSwitch;

type UseSwitchRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  SwitchRootBase &
  SwitchOptions & {
    /**
     * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
     * @default 'button'
     */
    elementType?: E;
  };

interface SwitchResponse<E extends ElementType = 'button'> {
  /** Props for the switch element. */
  switchProps: SwitchRootProps<E>;
  /** Props for the selection state. */
  state: SwitchState;
}

export type UseSwitchRoot = <E extends ElementType = 'button'>(
  props: UseSwitchRootProps<E>
) => SwitchResponse<E>;

/* -------------------------------------------------------------------------------------------
 * useSwitchThumb Types
 * ------------------------------------------------------------------------------------------*/

type SwitchThumbProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  DataAttrSwitch;

type UseSwitchThumbProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  SwitchState &
  SwitchOptions & {
    /**
     * The HTML element or React element used to render the switchThumb, e.g. 'div', 'span'.
     * @default 'span'
     */
    elementType?: E;
  };

interface SwitchThumbResponse<E extends ElementType> {
  /** Props for the switchThumb element. */
  switchThumbProps: SwitchThumbProps<E>;
}
export type UseSwitchThumb = <E extends ElementType = 'span'>(
  props: UseSwitchThumbProps<E>
) => SwitchThumbResponse<E>;

/* -------------------------------------------------------------------------------------------
 * useSwitch Types
 * ------------------------------------------------------------------------------------------*/

export interface UseSwitch {
  Root: UseSwitchRoot;
  Thumb: UseSwitchThumb;
}
