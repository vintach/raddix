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
