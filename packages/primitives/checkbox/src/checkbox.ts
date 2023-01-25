import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  useCallback,
  useState
} from 'react';
import merger from 'merge-props';
import { getAriaChecked, getAttr, getDataChecked } from './checkbox.utils';

type Checked = { checked?: boolean };
type Disabled = { disabled?: boolean; isDisabled?: boolean };
type Indeterminate = { indeterminate?: boolean };
export type Booleanish = boolean | 'true' | 'false';

interface CheckedOptions extends Checked {
  defaultChecked: boolean;
  onChecked?(checked: boolean): void;
}

interface IndeterminateOptions extends Indeterminate {
  onIndeterminate?(indeterminate: boolean): void;
}

export interface CheckboxState extends Checked, Indeterminate, Disabled {}

export interface CheckboxRootBase
  extends CheckedOptions,
    IndeterminateOptions,
    Disabled {
  required?: boolean;
  readOnly?: boolean;
}

interface DataAttrCheckbox {
  'data-checked'?: Booleanish;
  'data-indeterminate'?: Booleanish;
  'data-disabled'?: Booleanish;
}
interface AriaAttrCheckbox {
  role: 'checkbox';
  'aria-checked'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-disabled'?: boolean;
}

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

type CheckboxRootProps<E extends ElementType> = ComponentPropsWithoutRef<E> &
  AriaAttrCheckbox &
  DataAttrCheckbox;
type CheckboxRootHookProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> &
    CheckboxRootBase & {
      /**
       * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
       * @default 'button'
       */
      elementType?: E;
    };
interface CheckboxResponse<E extends ElementType> {
  /** Props for the switch element. */
  checkboxProps: CheckboxRootProps<E>;
  /** Props for the selection state. */
  state: CheckboxState;
}
type CheckboxRootHook = <E extends ElementType = 'button'>(
  props: CheckboxRootHookProps<E>
) => CheckboxResponse<E>;

export const useCheckboxRoot = (props => {
  let {
    checked: checkedProp,
    indeterminate: indeterminateProp = false,
    defaultChecked = false,
    onChecked,
    onIndeterminate,
    elementType = 'button',
    ...rest
  } = props;

  const [checked, setChecked] = useChecked({
    defaultChecked,
    checked: checkedProp,
    onChecked
  });
  let [indeterminate, setIndeterminate] = useIndeterminate({
    indeterminate: indeterminateProp,
    onIndeterminate
  });

  const handleClick = () => {
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
    'aria-checked': getAriaChecked(checked, indeterminate)
  };

  // Data attribute
  const dataAttr: DataAttrCheckbox = {
    'data-checked': getDataChecked(checked, indeterminate),
    'data-indeterminate': getAttr(indeterminate)
  };

  // Attributes according to element type
  let elementProps;
  if (elementType === 'input') {
    elementProps = {
      type: 'checkbox',
      ...merger({
        onChange: handleChange
      })
    };
  } else if (elementType === 'button') {
    elementProps = {
      type: 'button',
      ...ariaAttr,
      ...merger({
        onClick: handleClick
      })
    };
  } else {
    elementProps = {
      ...ariaAttr,
      tabIndex: 0
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
}) as CheckboxRootHook;

/* -------------------------------------------------------------------------------------------
 * useCheckboxIndicator
 * ------------------------------------------------------------------------------------------*/

type CheckboxIndicatorProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> & DataAttrCheckbox;
interface CheckboxIndicator<E extends ElementType> {
  /** Props for the switch element. */
  checkboxIndicatorProps: CheckboxIndicatorProps<E>;
}

type UseCheckboxIndicatorProps<E extends ElementType> =
  ComponentPropsWithoutRef<E> &
    CheckboxState & {
      /**
       * The HTML element or React element used to render the switch, e.g. 'div', 'span'.
       * @default 'span'
       */
      elementType?: E;
    };
type UseCheckboxIndicator = <E extends ElementType = 'span'>(
  props: UseCheckboxIndicatorProps<E>
) => CheckboxIndicator<E>;

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
