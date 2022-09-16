import { useHover } from '@mark-hooks/usehover';
import { usePress } from '@mark-hooks/usepress';
import { ElementType, useMemo } from 'react';
import { ButtonHook, ButtonHookProps } from './useButton.types';

export const useButton: ButtonHook = <E extends ElementType>(
  props: ButtonHookProps<E>
) => {
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
