import { useHover, HoverProps } from '@raddix/usehover';
import { usePress, PressProps } from '@raddix/usepress';
import { useMemo } from 'react';
import { PolymorphicHook } from '@mark-types/polymorphic';

export type ButtonHookProps = {
  isDisabled?: boolean;
  disabled?: boolean;
} & Omit<HoverProps, 'disabled'> &
  Omit<PressProps, 'disabled'>;

export type ButtonHook = PolymorphicHook<'button', ButtonHookProps>;

export const useButtonRoot = (props => {
  const {
    // isDisabled: its value corresponds to the disabled attribute
    isDisabled,
    // disabledProps: its value corresponds to the aria-disabled attribute
    disabled: disabledProp,
    elementType = 'button',
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
  if (elementType === 'button' || elementType === 'input') {
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
    elementProps: buttonProps
  };
}) as ButtonHook;

const useButton = {
  Root: useButtonRoot
};

export default useButton;
