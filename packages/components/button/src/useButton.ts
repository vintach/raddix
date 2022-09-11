import { useHover } from '@mark-hooks/usehover';
import { usePress } from '@mark-hooks/usepress';
import { useMemo } from 'react';

interface HookButtonProps {
  isDisabled?: boolean;
  disabled?: boolean;
}

interface HookButtonAttr {
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'data-disabled'?: boolean;
  'data-state'?: 'pressed' | 'hovered' | 'ready';
}

export const useButton = (props: HookButtonProps) => {
  const { isDisabled, disabled: disabledProp } = props;

  const disabled = isDisabled ?? disabledProp;

  const { pressEvents, isPressed } = usePress({
    disabled
  });

  const { hoverEvents, isHovered } = useHover({
    disabled
  });

  const getState = useMemo(() => {
    if (isPressed) {
      return 'pressed';
    }

    if (isHovered) {
      return 'hovered';
    }

    return 'ready';
  }, [isPressed, isHovered]);

  const buttonAtrr: HookButtonAttr = {
    'aria-disabled': disabledProp,
    'data-disabled': disabled,
    'data-state': getState,
    disabled: isDisabled
  };

  return { buttonProps: { ...pressEvents, ...hoverEvents, ...buttonAtrr } };
};
