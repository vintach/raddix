import { ElementType, MouseEvent } from 'react';
import {
  AriaAttrSwitch,
  Booleanish,
  DataAttrSwitch,
  Options,
  SwitchOptions,
  SwitchProps
} from './types';

export const getChecked = (checked: boolean) => {
  return checked ? 'checked' : 'unchecked';
};

export const getAttr = (value: boolean) =>
  (value ? '' : undefined) as Booleanish | undefined;

export const getOptions = (
  checked: boolean,
  disabled: boolean,
  options: SwitchOptions
) => {
  // Data attribute
  const dataAttr: DataAttrSwitch = {
    'data-state': getChecked(checked),
    'data-disabled': getAttr(disabled)
  };

  if (options.dataAttr) {
    return dataAttr;
  }
};

export const getSwitchProps = (
  elementType: ElementType,
  options: Options
): SwitchProps => {
  const { checked, disabled, readOnly, onClick, onChange, onKeyDown, onKeyUp } =
    options;

  // Aria attribute for element type other than input checkbox
  const ariaAttr: AriaAttrSwitch = {
    role: 'switch',
    'aria-checked': checked,
    'aria-readonly': readOnly,
    'aria-disabled': disabled
  };

  // default props depending on the element type
  let elementProps: SwitchProps = {};

  if (elementType === 'button') {
    elementProps = {
      ...ariaAttr,
      disabled,
      onClick,
      onKeyDown,
      onKeyUp
    };
  }

  if (elementType === 'input') {
    elementProps = {
      ...ariaAttr,
      onKeyDown,
      onKeyUp,
      onChange
    };
  }

  if (elementType !== 'button' && elementType !== 'input') {
    elementProps = {
      ...ariaAttr,
      tabIndex: 0,
      onClick,
      onKeyDown,
      onKeyUp
    };
  }
  return elementProps;
};
