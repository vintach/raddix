import { useHover } from '@mark-hooks/usehover';
import { usePress } from '@mark-hooks/usepress';
import { ElementType, useMemo } from 'react';

interface HookButtonProps {
  isDisabled?: boolean;
  disabled?: boolean;
  elemetType?: ElementType;
}

export const useButton = (props: HookButtonProps) => {
  const {
    isDisabled,
    disabled: disabledProp,
    elemetType = 'button',
    ...rest
  } = props;

  const disabled = isDisabled ?? disabledProp;

  const { pressEvents, isPressed } = usePress({ disabled });
  const { hoverEvents, isHovered } = useHover({ disabled });

  // current state of the component
  const getState = useMemo(() => {
    if (isPressed) {
      return 'pressed';
    }

    if (isHovered) {
      return 'hovered';
    }

    return 'ready';
  }, [isPressed, isHovered]);

  // default props depending on the element type
  let elementTypeProps;
  if (elemetType === 'button' || elemetType === 'input') {
    elementTypeProps = {
      type: 'button',
      disabled: isDisabled
    };
  } else {
    elementTypeProps = {
      role: 'button'
    };
  }

  const buttonProps = {
    ...elementTypeProps,
    ...hoverEvents,
    ...pressEvents,
    'aria-disabled': disabledProp,
    'data-disabled': disabled,
    'data-state': getState,
    ...rest
  };

  return {
    buttonProps: buttonProps
  };
};
