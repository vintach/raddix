import {
  ComponentPropsWithoutRef,
  ElementType,
  KeyboardEvent,
  MouseEvent,
  useState
} from 'react';
import { getChecked } from './switch.utils';
import merger from 'merge-props';

type CheckedProps = { checked?: boolean };
export interface SwitchState extends CheckedProps {
  disabled?: boolean;
  isDisabled?: boolean;
}
interface SwitchEvent {
  defaultChecked?: boolean;
  onChecked?(checked: boolean): void;
}
interface SwitchRootBase extends SwitchState, SwitchEvent {
  required?: boolean;
  readOnly?: boolean;
}
export interface AriaSwitchBase {
  'data-disabled'?: boolean;
  'data-state'?: 'checked' | 'unchecked';
}
interface AriaSwitchRoot extends AriaSwitchBase {
  'aria-checked'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

/* -------------------------------------------------------------------------------------------
 * useControlledState
 * Hook defines controlled or uncontrolled state
 * ------------------------------------------------------------------------------------------*/
interface ControlledState extends CheckedProps, SwitchEvent {}

const useControlledState = (options: ControlledState) => {
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
 * useSwitchRoot
 * ------------------------------------------------------------------------------------------*/

type SwitchRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaSwitchRoot & {};

type SwitchRootHookProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  SwitchRootBase & {
    /**
     * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
     * @default 'button'
     */
    elementType?: E;
  };

interface SwitchResponse<E extends ElementType> {
  /** Props for the switch element. */
  switchProps: SwitchRootProps<E>;
  /** Props for the selection state. */
  state: SwitchState;
}
type SwitchRootHook = <E extends ElementType = 'button'>(
  props: SwitchRootHookProps<E>
) => SwitchResponse<E>;

export const useSwitchRoot = (props => {
  const {
    checked: checkedProp,
    disabled: disabledProp,
    isDisabled,
    required,
    defaultChecked,
    onChecked,
    readOnly,
    elementType = 'button',
    ...rest
  } = props;

  const [checked, setChecked] = useControlledState({
    checked: checkedProp,
    defaultChecked,
    onChecked
  });

  const disabled = isDisabled ?? disabledProp;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }
    if (checked) return setChecked?.(false);
    if (!checked) return setChecked?.(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (checked) return setChecked?.(false);
      if (!checked) return setChecked?.(true);
    }
  };

  // default props depending on the element type
  let elementTypeProps;
  if (elementType === 'button' || elementType === 'input') {
    elementTypeProps = {
      role: 'switch',
      type: 'button',
      disabled: isDisabled
    };
  } else {
    elementTypeProps = {
      role: 'switch',
      tabIndex: 0
    };
  }

  const switchProps: AriaSwitchRoot = {
    'aria-checked': checked,
    'aria-readonly': readOnly,
    'aria-required': required,
    'aria-disabled': disabledProp,
    'data-disabled': disabled,
    'data-state': getChecked(checked)
  };

  const elementProps = {
    ...elementTypeProps,
    ...switchProps,
    ...merger(
      { onClick: handleClick, onKeyDown: handleKeyDown, onKeyUp: handleKeyUp },
      rest
    )
  };

  return {
    switchProps: elementProps,
    state: { checked, disabled, isDisabled }
  };
}) as SwitchRootHook;

/* -------------------------------------------------------------------------------------------
 * useSwitchThumb
 * ------------------------------------------------------------------------------------------*/

type SwitchThumbProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaSwitchBase;

type SwitchThumbHookProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  SwitchState & {
    /**
     * The HTML element or React element used to render the switchThumb, e.g. 'div', 'span'.
     * @default 'span'
     */
    elementType?: E;
  };

interface SwitchThumbResponse<E extends ElementType> {
  /** Props for the switchThumb element. */
  switchThumbProps: SwitchThumbProps<E> & AriaSwitchBase;
}
type SwitchThumbHook = <E extends ElementType = 'span'>(
  props: SwitchThumbHookProps<E>
) => SwitchThumbResponse<E>;

export const useSwitchThumb = (props => {
  const {
    checked,
    disabled: disabledProp,
    isDisabled,
    elementType = 'span',
    ...rest
  } = props;
  const disabled = isDisabled ?? disabledProp;

  const switchThumbProps = {
    'data-state': getChecked(checked ?? false),
    'data-disabled': disabled,
    ...rest
  };

  return { switchThumbProps };
}) as SwitchThumbHook;

const useSwitch = {
  Root: useSwitchRoot,
  Thumb: useSwitchThumb
};

export default useSwitch;
