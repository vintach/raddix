import { MouseEventHandler, PointerEventHandler, useState } from 'react';

interface BaseEvent {
  target: EventTarget;
  type: string;
  currentTarget: EventTarget & HTMLElement;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

type PointerType = 'mouse' | 'touch' | 'pen';

export interface HoverEvent {
  target: EventTarget;
  type: 'hoverstart' | 'hoverend' | 'hoverup' | 'hover';
  pointerType: PointerType;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}

export interface HoverProps {
  onHover?: (e: HoverEvent) => void;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;
  disabled?: boolean;
}

export interface DOMHoverEvents {
  onPointerEnter?: PointerEventHandler<HTMLElement>;
  onPointerLeave?: PointerEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
}

export interface HoverResult {
  isHovered: boolean;
  hoverEvents: DOMHoverEvents;
}

/*
 * Hook useHover
 * Support for interactions via mouse and touch
 */
export const useHover = (props: HoverProps): HoverResult => {
  const { disabled, onHover, onHoverEnd, onHoverStart } = props;

  const [isHovered, setIsHovered] = useState(false);

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

  const handleHoverStart = (event: BaseEvent, pointerType: PointerType) => {
    const { options } = eventOptions(event);

    if (onHoverStart) {
      onHoverStart({
        type: 'hoverstart',
        pointerType,
        ...options
      });
    }
  };

  const handleHoverEnd = (event: BaseEvent, pointerType: PointerType) => {
    const { options } = eventOptions(event);

    if (onHover) {
      onHover({
        type: 'hoverend',
        pointerType,
        ...options
      });
    }

    if (onHoverEnd) {
      onHoverEnd({
        type: 'hoverend',
        pointerType,
        ...options
      });
    }
  };

  const hoverEvents: DOMHoverEvents = {
    onPointerEnter(e) {
      if (disabled) {
        e.preventDefault();
        return;
      }
      handleHoverStart(e, e.pointerType);
      setIsHovered(true);
    },
    onPointerLeave(e) {
      if (disabled) {
        e.preventDefault();
        return;
      }
      handleHoverEnd(e, e.pointerType);
      setIsHovered(false);
    }
  };

  return { hoverEvents, isHovered };
};

export default useHover;
