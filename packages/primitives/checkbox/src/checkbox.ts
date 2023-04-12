import { ChangeEvent, useState } from 'react';
import { getAriaChecked, getAttr, getDataChecked } from './checkbox.utils';
import {
  AriaAttrCheckbox,
  UseCheckbox,
  DataAttrCheckbox,
  IndeterminateOptions,
  Element,
  UseProps
} from './types';
import { useToggle } from '@raddix/use-toggle';

/* -------------------------------------------------------------------------------------------
 * useIndeterminate
 * Hook defines checked or unchecked state
 * ------------------------------------------------------------------------------------------*/
const useIndeterminate = (options: IndeterminateOptions) => {
  const { indeterminate = false, onIndeterminate } = options;

  if (onIndeterminate) {
    return [indeterminate, onIndeterminate] as const;
  } else {
    return [indeterminate] as const;
  }
};

/* -------------------------------------------------------------------------------------------
 * useCheckbox
 * ------------------------------------------------------------------------------------------*/

export const useCheckbox = (<E extends Element = 'div'>(props: UseProps<E>) => {
  const {
    checked: initialChecked,
    indeterminate: indeterminateProp = false,
    defaultChecked = false,
    onChecked,
    onIndeterminate,
    elementType = 'button',
    disabled,
    isDisabled,
    readOnly,
    ...rest
  } = props;

  const [checked, setChecked, toggle] = useToggle(initialChecked);
  const [indeterminate, setIndeterminate] = useIndeterminate({
    indeterminate: indeterminateProp,
    onIndeterminate
  });

  const handleClick = () => {
    if (disabled || readOnly) {
      return;
    }

    setChecked?.(!checked);

    if (indeterminate) {
      setIndeterminate?.(false);
      setChecked?.(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setChecked?.(!checked);
  };

  // Aria attribute for element type other than input checkbox
  const ariaAttr: AriaAttrCheckbox = {
    role: 'checkbox',
    'aria-checked': getAriaChecked(checked, indeterminate),
    'aria-disabled': disabled,
    'aria-readonly': readOnly
  };

  // Data attribute
  const dataAttr: DataAttrCheckbox = {
    'data-checked': getDataChecked(checked, indeterminate),
    'data-indeterminate': getAttr(indeterminate),
    'data-disabled': getAttr(disabled || false)
  };

  // Attributes according to element type
  let elementProps;
  if (elementType === 'input') {
    elementProps = {
      type: 'checkbox',
      disabled: isDisabled,
      readOnly: readOnly,
      onChange: handleChange
    };
  } else if (elementType === 'button') {
    elementProps = {
      type: 'button',
      disabled: isDisabled,
      ...ariaAttr,
      onClick: handleClick
    };
  } else {
    elementProps = {
      ...ariaAttr,
      tabIndex: 0,
      onClick: handleClick
    };
  }

  return {
    checkboxProps: {
      ...elementProps,
      ...dataAttr,
      ...rest
    },
    state: {
      checked: checked,
      indeterminate: indeterminate
    }
  };
}) as UseCheckbox;

export default useCheckbox;
