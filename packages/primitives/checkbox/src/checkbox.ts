import { getAriaChecked, getAttr, getDataChecked } from './checkbox.utils';
import {
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
    checked: initialChecked = false,
    indeterminate: indeterminateProp = false,
    onIndeterminate,
    as = 'div',
    disabled,
    readOnly
  } = props;

  const [checked, setChecked, toggle] = useToggle(initialChecked);
  const [indeterminate, setIndeterminate] = useIndeterminate({
    indeterminate: indeterminateProp,
    onIndeterminate
  });

  const nativeProps: boolean = Boolean(as === 'button' || as === 'input');
  const nativeInput: boolean = as === 'input';
  const tabIndex = disabled ? -1 : 0;

  const handleClick = () => {
    if (disabled || readOnly) {
      return;
    }
    toggle();

    if (indeterminate) {
      setIndeterminate?.(false);
      setChecked(true);
    }
  };

  const onClick = () => (nativeInput ? {} : handleClick());

  // Data attribute
  const dataAttr: DataAttrCheckbox = {
    'data-checked': getDataChecked(checked, indeterminate),
    'data-indeterminate': getAttr(indeterminate),
    'data-disabled': getAttr(disabled || false)
  };

  // Attributes according to element type
  const checkboxProps = {
    role: 'checkbox',
    tabIndex: !nativeProps ? tabIndex : undefined,
    'aria-checked': !nativeInput
      ? getAriaChecked(checked, indeterminate)
      : undefined,
    'aria-readonly': readOnly,
    'aria-disabled': !nativeProps ? disabled : undefined,
    disabled: nativeProps ? disabled : undefined,
    onClick
  };

  return {
    checkboxProps,
    dataProps: dataAttr,
    state: { checked, indeterminate }
  };
}) as UseCheckbox;

export default useCheckbox;
