type AriaChecked = boolean | 'mixed';

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
