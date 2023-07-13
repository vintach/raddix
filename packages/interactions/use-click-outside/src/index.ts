import type { RefObject } from 'react';
import { useEffect } from 'react';

type Event = MouseEvent | TouchEvent;
type Handler = (event: Event) => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
): void => {
  useEffect(() => {
    const callback = (event: Event) => {
      const el = ref.current;

      if (!el || el.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener('mousedown', callback);
    document.addEventListener('touchstart', callback);
    return () => {
      document.removeEventListener('mousedown', callback);
      document.removeEventListener('touchstart', callback);
    };
  }, [ref, handler]);
};
