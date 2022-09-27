import { MouseEvent, useState } from 'react';
import { PolymorphicHook } from '@mark-types/polymorphic';

interface DisabledProps {
  disabled?: boolean;
}

interface CheckedProps {
  checked?: boolean;
}

export interface SwitchEvent extends CheckedProps {
  defaultChecked?: boolean;
  onChecked?(checked: boolean): void;
}

interface SwitchRootHookProps extends SwitchEvent, DisabledProps {
  required?: boolean;
  readOnly?: boolean;
  isDisabled?: boolean;
}

interface SwitchThumbHookProps extends CheckedProps, DisabledProps {}

export type SwitchRootHook = PolymorphicHook<'button', SwitchRootHookProps>;
export type SwitchThumbHook = PolymorphicHook<'span', SwitchThumbHookProps>;

/*
 * Hook defines controlled or uncontrolled state
 */
const useControlledState = (options: SwitchEvent) => {
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

/*
 * Hook switch root
 */
export const useSwitchRoot: SwitchRootHook = props => {
  const {
    checked: checkedProp,
    disabled: disabledProp,
    isDisabled,
    required,
    defaultChecked,
    onChecked,
    readOnly,
    elementType = 'button',
    ...rest
  } = props;

  const [checked, setChecked] = useControlledState({
    checked: checkedProp,
    defaultChecked,
    onChecked
  });

  const disabled = isDisabled ?? disabledProp;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }
    if (checked) return setChecked?.(false);
    if (!checked) return setChecked?.(true);
  };

  const switchProps = {
    'aria-checked': { checked },
    'aria-readonly': { readOnly },
    'aria-required': { required },
    'aria-disabled': { disabledProp },
    'data-disabled': { disabled },
    disabled: { isDisabled },
    onClick: { handleClick }
  };

  return {
    elementProps: { ...switchProps, ...rest }
  };
};
