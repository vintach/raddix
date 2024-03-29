import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  ElementType,
  InputHTMLAttributes,
  Dispatch,
  SetStateAction
} from 'react';

/* -------------------------------------------------------------------------------------------
 * Global Types
 * ------------------------------------------------------------------------------------------*/

export type Booleanish = '' | undefined;
export type DataState = 'checked' | 'unchecked';

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

export type Event =
  | MouseEvent
  | ReactKeyboardEvent
  | ChangeEvent
  | KeyboardEvent;

export interface DataAttrSwitch {
  'data-state'?: DataState;
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

// Types to be omitted in SwitchProps
interface UseSwitchOptions {
  /** Handler that is called when the Switch's selection state changes. */
  onChange?: (e: ChangeEvent) => void;
}

export interface UseSwitchProps
  extends Checked,
    Disabled,
    ReadOnly,
    UseSwitchOptions {}

export interface As<E extends ElementType> {
  /**
   * The HTML element or React element used to render the switch, e.g. 'div', 'button'.
   * @default 'div'
   */
  as?: E;
}

export type UseProps<E extends ElementType> = As<E> & UseSwitchProps;

export type Props = Omit<UseSwitchProps, keyof UseSwitchOptions>;

type SwitchProps<E extends ElementType> = Props &
  Omit<ComponentPropsWithoutRef<E>, keyof Props>;

export interface UseResponse<E extends ElementType> {
  switchProps: SwitchProps<E>;
  dataProps: DataAttrSwitch;
  state: SwitchState;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export type UseSwitch = <E extends ElementType = 'div'>(
  props?: UseProps<E>
) => UseResponse<E>;
