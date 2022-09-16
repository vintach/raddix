import { useHover, HoverProps } from '@mark-hooks/usehover';
import { usePress, PressProps } from '@mark-hooks/usepress';
import { ElementType, useMemo } from 'react';

interface HookButtonProps
  extends Omit<HoverProps, 'disabled'>,
    Omit<PressProps, 'disabled'> {
  isDisabled?: boolean;
  disabled?: boolean;
  elemetType?: ElementType;
}

export const useButton = (props: HookButtonProps) => {
  const {
    // isDisabled: its value corresponds to the disabled attribute
    isDisabled,
    // disabledProps: its value corresponds to the aria-disabled attribute
    disabled: disabledProp,
    elemetType = 'button',
    onPress,
    onPressEnd,
    onPressStart,
    onHover,
    onHoverEnd,
    onHoverStart,
    ...rest
  } = props;

  const disabled = isDisabled ?? disabledProp;

  const { pressEvents, isPressed } = usePress({
    disabled,
    onPress,
    onPressStart,
    onPressEnd
  });
  const { hoverEvents, isHovered } = useHover({
    disabled,
    onHover,
    onHoverStart,
    onHoverEnd
  });

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
