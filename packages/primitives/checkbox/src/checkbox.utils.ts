import type { AriaChecked, Booleanish } from './types';

export const getAriaChecked = (
  checked: boolean,
  indeterminate: boolean
): AriaChecked => {
  if (indeterminate) {
    return 'mixed';
  }

  if (checked) {
    return true;
  } else {
    return false;
  }
};

export const getAttr = (value: boolean) =>
  (value ? '' : undefined) as Booleanish | undefined;

export const getDataChecked = (checked: boolean, indeterminate: boolean) =>
  indeterminate ? undefined : (getAttr(checked) as Booleanish);
