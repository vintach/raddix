import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  ElementType,
  InputHTMLAttributes,
  Dispatch,
  SetStateAction
} from 'react';

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
}

interface ReadOnly {
  readOnly?: boolean;
}

export interface SwitchState extends Checked, Disabled {
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export type Event = MouseEvent | KeyboardEvent | ChangeEvent;

export interface DataAttrSwitch {
  'data-state'?: 'checked' | 'unchecked';
  'data-disabled'?: Booleanish;
}
export interface AriaAttrSwitch {
  role?: 'switch';
  'aria-checked'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useSwitchRoot Types
 * ------------------------------------------------------------------------------------------*/

export interface UseSwitchProps extends Checked, Disabled, ReadOnly {}

export type Element<E = any> = ElementType<E>;
export type As<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the switch, e.g. 'div', 'button'.
   * @default 'input'
   */
  as?: E;
};

export type UseProps<E extends ElementType> = As<E> & UseSwitchProps;

type SwitchProps<E extends ElementType> = UseSwitchProps &
  Omit<ComponentPropsWithoutRef<E>, keyof UseSwitchProps>;

export type UseResponse<E extends ElementType> = {
  switchProps: SwitchProps<E>;
  dataProps: DataAttrSwitch;
  state: SwitchState;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export type UseSwitch = <E extends ElementType = 'div'>(
  props?: UseProps<E>
) => UseResponse<E>;
