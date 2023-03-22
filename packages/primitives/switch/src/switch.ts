import { getOptions, getSwitchProps } from './switch.utils';
import merger from 'merge-props';
import { Event, UseSwitchProps } from './types';
import { useToggle } from '@raddix/use-toggle';
import { useKeyboard } from '@raddix/use-keyboard';

/* -------------------------------------------------------------------------------------------
 * useSwitch
 * ------------------------------------------------------------------------------------------*/

export const useSwitch = (props: UseSwitchProps = {}) => {
  const {
    checked: initialChecked = false,
    onChecked,
    disabled,
    readOnly,
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

  const dataProps = getOptions(checked, disabled ?? false, {
    dataAttr: true
  });

  const inputProps = {
    tabIndex: -1,
    type: 'checkbox',
    checked,
    disabled,
    onChange: eventHandler
  };

  return {
    switchProps: merger({
      ...switchProps,
      ...rest
    }),
    inputProps,
    dataProps,
    state: { checked, disabled, setChecked }
  };
};

export default useSwitch;
