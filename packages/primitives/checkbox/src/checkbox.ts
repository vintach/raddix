import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  useCallback,
  useState
} from 'react';
import merger from 'merge-props';

type Checked = { checked?: boolean };
type Disabled = { disabled?: boolean; isDisabled?: boolean };
type Indeterminate = { indeterminate?: boolean };

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
  'data-state'?: 'checked' | 'unchecked' | 'indeterminate';
  'data-disabled'?: boolean;
}
interface AriaAttrCheckbox extends DataAttrCheckbox {
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
  const { indeterminate, onIndeterminate } = options;

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
  AriaAttrCheckbox & {};
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
    elementType = 'button'
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

  const handleClick = useCallback(() => {
    setChecked?.(!checked);

    if (indeterminate) {
      setIndeterminate?.(false);
      setChecked?.(true);
    }
  }, [checked, setChecked, indeterminate, setIndeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setChecked?.(!checked);
  };

  let elementTypeProps;
  if (elementType === 'input') {
    elementTypeProps = {
      type: 'checkbox',
      ...merger({
        onChange: handleChange
      })
    };
  } else if (elementType === 'button') {
    elementTypeProps = {
      type: 'button',
      ...merger({
        onClick: handleClick
      })
    };
  } else {
    elementTypeProps = {
      tabIndex: 0
    };
  }

  const checkboxProps: AriaAttrCheckbox = {
    'data-state': indeterminate
      ? 'indeterminate'
      : checked
      ? 'checked'
      : 'unchecked'
  };

  const elementProps = {
    ...elementTypeProps,
    ...checkboxProps
  };

  return {
    checkboxProps: elementProps,
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
    checked,
    disabled: disabledProp,
    indeterminate,
    isDisabled,
    ...rest
  } = props;
  const disabled = isDisabled ?? disabledProp;

  return {
    checkboxIndicatorProps: {
      'data-disabled': disabled,
      'data-state': indeterminate
        ? 'indeterminate'
        : checked
        ? 'checked'
        : 'unchecked',
      ...rest
    }
  };
}) as UseCheckboxIndicator;

const useCheckbox = {
  Root: useCheckboxRoot,
  Indicator: useCheckboxIndicator
};

export default useCheckbox;
