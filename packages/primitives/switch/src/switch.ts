import { KeyboardEvent, MouseEvent, useState } from 'react';
import { getAttr, getChecked } from './switch.utils';
import merger from 'merge-props';
import {
  AriaAttrSwitch,
  CheckedOptions,
  DataAttrSwitch,
  UseSwitchRoot,
  UseSwitchThumb
} from './types';

/* -------------------------------------------------------------------------------------------
 * useControlledState
 * Hook defines controlled or uncontrolled state
 * ------------------------------------------------------------------------------------------*/
const useControlledState = (options: CheckedOptions) => {
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

  // Aria attribute for element type other than input checkbox
  const ariaAttr: AriaAttrSwitch = {
    role: 'switch',
    'aria-checked': checked,
    'aria-readonly': readOnly,
    'aria-required': required,
    'aria-disabled': disabledProp
  };

  // Data attribute
  const dataAttr: DataAttrSwitch = {
    'data-state': getChecked(checked),
    'data-disabled': getAttr(disabled || false)
  };

  // default props depending on the element type
  let elementProps;
  if (elementType === 'button' || elementType === 'input') {
    elementProps = {
      type: 'button',
      ...ariaAttr,
      disabled: isDisabled,
      onClick: handleClick
    };
  } else {
    elementProps = {
      ...ariaAttr,
      tabIndex: 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    };
  }

  return {
    switchProps: merger({
      ...elementProps,
      ...dataAttr,
      ...rest
    }),
    state: { checked, disabled, isDisabled }
  };
}) as UseSwitchRoot;

/* -------------------------------------------------------------------------------------------
 * useSwitchThumb
 * ------------------------------------------------------------------------------------------*/

export const useSwitchThumb = (props => {
  const {
    checked,
    disabled: disabledProp,
    isDisabled,
    elementType = 'span',
    ...rest
  } = props;
  const disabled = isDisabled ?? disabledProp;

  // Data attribute
  const dataAttr: DataAttrSwitch = {
    'data-state': getChecked(checked ?? false),
    'data-disabled': getAttr(disabled || false)
  };

  return {
    switchThumbProps: {
      ...dataAttr,
      ...rest
    }
  };
}) as UseSwitchThumb;
