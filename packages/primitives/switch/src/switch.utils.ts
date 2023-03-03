import { Booleanish, DataAttrSwitch, SwitchOptions } from './types';

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
