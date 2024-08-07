import type { ChangeEvent, MouseEvent, ElementType } from 'react';
import { useCallback } from 'react';
import { getAttr, getChecked } from './switch.utils';
import type { Event, UseProps, UseSwitch } from './types';
import { useToggle } from '@raddix/use-toggle';
import { useKeyboard } from '@raddix/use-keyboard';

/* -------------------------------------------------------------------------------------------
 * useSwitch
 * ------------------------------------------------------------------------------------------*/

export const useSwitch = (<E extends ElementType = 'div'>(
  props: UseProps<E> = {}
) => {
  const {
    checked: initialChecked = false,
    disabled = false,
    readOnly = false,
    as = 'div',
    onChange: handleChange
  } = props;

  const [checked, toggle, setChecked] = useToggle(
    [false, true],
    initialChecked
  );

  const nativeProps = Boolean(as === 'button' || as === 'input');
  const nativeInput: boolean = as === 'input';
  const tabIndex = disabled ? -1 : 0;

  const eventHandler = useCallback(
    (e: Event) => {
      if (disabled || readOnly) {
        e.preventDefault();
        return;
      }
      toggle();

      const eventChange = e as ChangeEvent;
      handleChange?.(eventChange);
    },
    [disabled, readOnly, toggle, handleChange]
  );

  const onKeyDown = useKeyboard(e => e.preventDefault(), ['Enter', ' ']);
  const onKeyUp = useKeyboard(e => eventHandler(e), ['Enter', ' ']);
  const onClick = (e: MouseEvent) => (nativeInput ? {} : eventHandler(e));
  const onChange = (e: ChangeEvent) => (!nativeInput ? {} : eventHandler(e));

  const switchProps = {
    role: 'switch',
    tabIndex: !nativeProps ? tabIndex : undefined,
    'aria-checked': !nativeInput ? checked : undefined,
    'aria-readonly': readOnly,
    'aria-disabled': !nativeProps ? disabled : undefined,
    disabled: nativeProps ? disabled : undefined,
    onClick,
    onKeyDown,
    onKeyUp,
    onChange
  };

  const dataAttr = {
    'data-state': getChecked(checked),
    'data-disabled': getAttr(disabled)
  };

  const inputProps = {
    tabIndex: -1,
    type: 'checkbox',
    checked,
    disabled,
    onChange: eventHandler
  };

  return {
    switchProps,
    inputProps,
    dataProps: dataAttr,
    state: { checked, disabled, setChecked }
  };
}) as UseSwitch;
