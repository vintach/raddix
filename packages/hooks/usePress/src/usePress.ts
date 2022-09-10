import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  useState
} from 'react';

export interface PressEvent {
  target: Element;
  type: 'presstart' | 'pressend' | 'pressup' | 'press';
  event: 'mouse' | 'keyboard' | 'touch';
}

export interface PressProps {
  onPress?: (e: PressEvent) => void;
  onPressStart?: (e: PressEvent) => void;
  onPressEnd?: (e: PressEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  disabled?: boolean;
}

export interface DOMEvents {
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  onKeyUp?: KeyboardEventHandler<HTMLElement>;
  onMouseDown?: MouseEventHandler<HTMLElement>;
  onMouseUp?: MouseEventHandler<HTMLElement>;
  onMouseOut?: MouseEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onPointerUp?: PointerEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
}

export interface PressResult {
  isPressed: boolean;
  pressEvents: DOMEvents;
}

export const usePress = (props: PressProps): PressResult => {
  const { disabled = false } = props;

  const [isPressed, setIsPressed] = useState(false);

  const pressEvents: DOMEvents = {
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

      let target = e.currentTarget;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsPressed(false);
        target.click();
      }
    },
    onClick(e) {
      e.stopPropagation();
      if (disabled) {
        e.preventDefault();
        return;
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

  return { pressEvents, isPressed };
};

export default usePress;
