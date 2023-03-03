import { Booleanish } from './types';

export const getChecked = (checked: boolean) => {
  return checked ? 'checked' : 'unchecked';
};

export const getAttr = (value: boolean) =>
  (value ? '' : undefined) as Booleanish | undefined;
