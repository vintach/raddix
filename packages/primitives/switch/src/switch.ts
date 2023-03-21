import { KeyboardEvent, MouseEvent } from 'react';
import {
  getAttr,
  getChecked,
  getOptions,
  getSwitchProps
} from './switch.utils';
import merger from 'merge-props';
import { AriaAttrSwitch, Event, UseSwitch, UseSwitchProps } from './types';
import { useToggle } from '@raddix/use-toggle';
import { useKeyboard } from '@raddix/use-keyboard';

/* -------------------------------------------------------------------------------------------
 * useSwitch
 * ------------------------------------------------------------------------------------------*/

export const useSwitch = (props: UseSwitchProps = {}) => {
  const {
    checked: initialChecked = false,
    onChecked,
    disabled = false,
    readOnly = false,
    elementType = 'button',
    ...rest
  } = props;

  const [checked, setChecked, toggle] = useToggle(initialChecked);

  const eventHandler = (e: Event) => {
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }
    toggle();
  };

  const onKeyDown = useKeyboard(e => e.preventDefault(), ['Enter', ' ']);
  const onKeyUp = useKeyboard(e => eventHandler(e), ['Enter', ' ']);

  const switchProps = getSwitchProps(elementType, {
    checked,
    disabled,
    readOnly,
    onClick: eventHandler,
    onKeyDown,
    onKeyUp,
    onChange: eventHandler
  });

  const elementOptions = getOptions(checked, disabled ?? false, {
    dataAttr: false
  });

  return {
    switchProps: merger({
      ...switchProps,
      ...rest,
      ...elementOptions
    }),
    state: { checked, disabled }
  };
};
