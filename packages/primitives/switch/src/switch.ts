import { KeyboardEvent, MouseEvent, useState } from 'react';
import { getChecked } from './switch.utils';
import merger from 'merge-props';
import { CheckedOptions, UseSwitchRoot, UseSwitchThumb } from './types';

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

  const switchProps = {
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

  const switchThumbProps = {
    'data-state': getChecked(checked ?? false),
    'data-disabled': disabled,
    ...rest
  };

  return { switchThumbProps };
}) as UseSwitchThumb;
