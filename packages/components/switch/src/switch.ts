import { MouseEvent, useState } from 'react';
import { PolymorphicHook } from '@mark-types/polymorphic';
import { getChecked } from './switch.utils';
import { merger } from '@mark-utils/merger';

interface DisabledProps {
  disabled?: boolean;
  isDisabled?: boolean;
}

interface CheckedProps {
  checked?: boolean;
}

export interface Props extends DisabledProps, CheckedProps {}

export interface SwitchEvent extends CheckedProps {
  defaultChecked?: boolean;
  onChecked?(checked: boolean): void;
}

export interface SwitchRootHookProps extends SwitchEvent, DisabledProps {
  required?: boolean;
  readOnly?: boolean;
}

interface SwitchResponse {
  state: Props;
}

interface SwitchThumbHookProps extends Props {}

export type SwitchRootHook = PolymorphicHook<
  'button',
  SwitchRootHookProps,
  SwitchResponse
>;
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
export const useSwitchRoot = (props => {
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
    'aria-checked': checked,
    'aria-readonly': readOnly,
    'aria-required': required,
    'aria-disabled': disabledProp,
    'data-disabled': disabled,
    'data-state': getChecked(checked),
    disabled: isDisabled,
    onClick: handleClick
  };

  return {
    elementProps: merger(switchProps, rest),
    state: { checked, disabled, isDisabled }
  };
}) as SwitchRootHook;

/*
 * Hook switch thumb
 */
export const useSwitchThumb = (props => {
  const {
    checked,
    disabled: disabledProp,
    isDisabled,
    elementType,
    ...rest
  } = props;
  const disabled = isDisabled ?? disabledProp;

  const switchThumProps = {
    'data-state': getChecked(checked ?? false),
    'data-disabled': disabled,
    ...rest
  };

  return {
    elementProps: switchThumProps
  };
}) as SwitchThumbHook;

const useSwitch = {
  Root: useSwitchRoot,
  Thumb: useSwitchThumb
};

export default useSwitch;
