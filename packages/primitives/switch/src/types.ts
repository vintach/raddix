import { ChangeEvent, ElementType, KeyboardEvent, MouseEvent } from 'react';

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

export interface SwitchState extends Checked, Disabled {}

export type Event =
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>
  | ChangeEvent<HTMLElement>;

export interface Options extends Checked, Disabled, ReadOnly {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onChange?: (e: ChangeEvent<HTMLElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
}

export interface SwitchOptions {
  /**
   * Return data attributes on those components that have a state
   * @default true
   */
  dataAttr?: boolean;
}

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

export interface UseSwitchProps extends Checked, Disabled, ReadOnly {
  /**
   * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
   * @default 'button'
   */
  elementType?: ElementType;
  /**
   * Event to update the value checked property.
   */
  onChecked?(checked: boolean): void;
}

interface SwitchResponse {
  /** Props for the switch element. */
  switchProps: SwitchProps;
  /** Props for the selection state. */
  state: SwitchState;
}

export type UseSwitch = (props?: UseSwitchProps) => SwitchResponse;

export interface SwitchProps extends AriaAttrSwitch, Options {
  tabIndex?: number;
}
