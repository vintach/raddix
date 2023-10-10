import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect } from 'react';
import type { Keys } from './keys';

type Event = ReactKeyboardEvent | KeyboardEvent;
type KeyboardHandler = (event: Event) => void;
type KeyboardResult = (event: ReactKeyboardEvent) => void;

interface Options {
  globalEvent?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  checker?: 'key' | 'code';
}

type UseKeyboard = (
  handler: KeyboardHandler,
  shortcut?: Keys[],
  options?: Options
) => KeyboardResult;

export const useKeyboard: UseKeyboard = (handler, shortcut, options = {}) => {
  const {
    globalEvent = false,
    preventDefault = false,
    stopPropagation = true,
    checker = 'key'
  } = options;

  const eventHandler = (event: Event) => {
    if (shortcut && shortcut.length > 0) {
      const match = shortcut.includes(event[checker]);

      if (!match) return;
    }

    if (stopPropagation) {
      event.stopPropagation();
    }

    if (preventDefault) {
      event.preventDefault();
    }

    handler(event);
  };

  useEffect(() => {
    if (globalEvent) {
      document.addEventListener('keydown', eventHandler);
    }

    return () => {
      document.removeEventListener('keydown', eventHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalEvent]);

  return eventHandler;
};
