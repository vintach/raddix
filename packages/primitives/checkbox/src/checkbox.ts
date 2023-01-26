import { ChangeEvent, useState } from 'react';
import merger from 'merge-props';
import { getAriaChecked, getAttr, getDataChecked } from './checkbox.utils';
import {
  AriaAttrCheckbox,
  CheckboxRootHook,
  CheckedOptions,
  DataAttrCheckbox,
  IndeterminateOptions,
  UseCheckboxIndicator
} from './types';

/* -------------------------------------------------------------------------------------------
 * useChecked
 * Hook defines checked or unchecked state
 * ------------------------------------------------------------------------------------------*/
const useChecked = (options: CheckedOptions) => {
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
 * useCheckboxRoot
 * ------------------------------------------------------------------------------------------*/

export const useCheckboxRoot = (props => {
  const {
    checked: checkedProp,
    indeterminate: indeterminateProp = false,
    defaultChecked = false,
    onChecked,
    onIndeterminate,
    elementType = 'button',
    disabled: disabledProp,
    isDisabled,
    readOnly,
    ...rest
  } = props;

  const [checked, setChecked] = useChecked({
    defaultChecked,
    checked: checkedProp,
    onChecked
  });
  const [indeterminate, setIndeterminate] = useIndeterminate({
    indeterminate: indeterminateProp,
    onIndeterminate
  });

  const disabled = isDisabled ?? disabledProp;

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
    'aria-disabled': disabledProp,
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
    checkboxProps: merger({
      ...elementProps,
      ...dataAttr,
      ...rest
    }),
    state: {
      checked: checked,
      indeterminate: indeterminate
    }
  };
}) as CheckboxRootHook;

/* -------------------------------------------------------------------------------------------
 * useCheckboxIndicator
 * ------------------------------------------------------------------------------------------*/

export const useCheckboxIndicator = (props => {
  const {
    elementType = 'span',
    checked = false,
    disabled: disabledProp,
    indeterminate = false,
    isDisabled,
    ...rest
  } = props;
  const disabled = isDisabled ?? disabledProp;

  return {
    checkboxIndicatorProps: {
      'data-disabled': disabled,
      'data-checked': getDataChecked(checked, indeterminate),
      'data-indeterminate': getAttr(indeterminate),
      ...rest
    }
  };
}) as UseCheckboxIndicator;

const useCheckbox = {
  Root: useCheckboxRoot,
  Indicator: useCheckboxIndicator
};

export default useCheckbox;
