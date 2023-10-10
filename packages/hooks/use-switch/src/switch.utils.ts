import type { Booleanish, DataState } from './types';

export const getChecked = (checked: boolean): DataState =>
  checked ? 'checked' : 'unchecked';

export const getAttr = (value: boolean): Booleanish => (value ? '' : undefined);
