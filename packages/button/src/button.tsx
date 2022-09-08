import {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  PropsWithChildren,
  useMemo,
  useState
} from 'react';
import { ButtonProps } from './button.types';

interface PressEvent {
  target: Element;
  type: 'pressstart' | 'pressend' | 'pressup' | 'press';
  event: 'mouse' | 'keyboard' | 'touch';
}

interface PressProps {
  onPress?: (e: PressEvent) => void;
  onPressStart?: (e: PressEvent) => void;
  onPressEnd?: (e: PressEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  disabled?: boolean;
}

interface DOMEvents {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onKeyUp?: KeyboardEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
  onMouseOut?: MouseEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onPointerUp?: PointerEventHandler<HTMLButtonElement>;
  onTouchStart?: React.TouchEventHandler<HTMLButtonElement>;
}

interface PressResult {
  isPressed: boolean;
  eventsProps: DOMEvents;
}

const usePress = (props: PressProps): PressResult => {
  const {
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    disabled = false
  } = props;

  const [isPressed, setIsPressed] = useState(false);

  const eventsProps: DOMEvents = {
    onKeyDown(e) {
      e.stopPropagation();
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsPressed(true);
      }
    },
    onKeyUp(e) {
      e.stopPropagation();
      if (disabled) {
        e.preventDefault();
        return;
      }

      console.log(e);
      let target = e.currentTarget;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsPressed(false);
        target.click();
      }
    },
    onClick(e) {
      if (e && !e.currentTarget.contains(e.target as Element)) {
        return;
      }

      if (e && e.button === 0) {
        e.stopPropagation();
        if (disabled) {
          e.preventDefault();
          return;
        }
      }
    },
    onMouseDown(e) {
      if (disabled) {
        e.preventDefault();
        return;
      }
      setIsPressed(true);
    },
    onMouseUp(e) {
      if (disabled) {
        e.preventDefault();
        return;
      }
      setIsPressed(false);
    },
    onMouseOut(e) {
      setIsPressed(false);
    },
    onBlur(e) {
      setIsPressed(false);
    },
    onPointerUp(e) {
      setIsPressed(false);
    },
    onTouchStart(e) {
      console.log('Touch');
    }
  };

  return { eventsProps, isPressed };
};

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const {
    children,
    disabled: disabledProp,
    isDisabled,
    asChild,
    onPress,
    onPressStart,
    onPressEnd,
    ...rest
  } = props;

  const Component = asChild || 'button';
  const disabled = isDisabled ?? disabledProp;

  const { eventsProps, isPressed } = usePress({
    disabled,
    onPress,
    onPressStart,
    onPressEnd
  });

  const getState = useMemo(() => {
    if (isPressed) {
      return 'pressed';
    }

    return 'ready';
  }, [isPressed]);

  return (
    <button
      ref={ref}
      aria-disabled={disabledProp}
      data-disabled={disabled}
      disabled={isDisabled}
      data-state={getState}
      {...eventsProps}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
