import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  useState
} from 'react';

interface BaseEvent {
  target: EventTarget;
  type: string;
  currentTarget: EventTarget & HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  preventDefault(): void;
  stopPropagation(): void;
}

type PressType = 'presstart' | 'pressend' | 'pressup' | 'press';
type PointerType = 'mouse' | 'keyboard' | 'touch';

export interface PressEvent {
  type: PressType;
  pointerType: PointerType;
  target: EventTarget;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

export interface PressProps {
  onPress?: (e: PressEvent) => void;
  onPressStart?: (e: PressEvent) => void;
  onPressEnd?: (e: PressEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  disabled?: boolean;
}

export interface DOMPressEvents {
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
  pressEvents: DOMPressEvents;
}

export const usePress = (props: PressProps): PressResult => {
  const { disabled = false, onPress, onPressEnd, onPressStart } = props;

  const [isPressed, setIsPressed] = useState(false);

  const eventOptions = (event: BaseEvent) => {
    const options = {
      target: event.target,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    };
    return { options };
  };

  const handlePressStart = (event: BaseEvent, pointerType: PointerType) => {
    const { options } = eventOptions(event);

    if (onPressStart) {
      onPressStart({
        type: 'presstart',
        pointerType,
        ...options
      });
    }
  };

  const handlePressEnd = (event: BaseEvent, pointerType: PointerType) => {
    const { options } = eventOptions(event);

    if (onPress) {
      onPress({
        type: 'press',
        pointerType,
        ...options
      });
    }

    if (onPressEnd) {
      onPressEnd({
        type: 'pressend',
        pointerType,
        ...options
      });
    }
  };

  const pressEvents: DOMPressEvents = {
    onKeyDown(e) {
      e.stopPropagation();
      if (disabled) {
        e.preventDefault();
        return;
      }
      handlePressStart(e, 'keyboard');

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
      handlePressEnd(e, 'keyboard');

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
      handlePressStart(e, 'mouse');
      setIsPressed(true);
    },
    onMouseUp(e) {
      if (disabled) {
        e.preventDefault();
        return;
      }
      handlePressEnd(e, 'mouse');
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
