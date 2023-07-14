import type { KeyboardEvent } from 'react';
import type { Keys } from './keys';

type KeyboardHandler = (event: KeyboardEvent) => void;

interface Options {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  checker?: 'key' | 'code';
}

type UseKeyboard = (
  handler: KeyboardHandler,
  shortcut?: Keys[],
  options?: Options
) => KeyboardHandler;

export const useKeyboard: UseKeyboard = (handler, shortcut, options = {}) => {
  const {
    preventDefault = false,
    stopPropagation = true,
    checker = 'key'
  } = options;

  const eventHandler = (event: KeyboardEvent) => {
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

  return eventHandler;
};
