import type { KeyboardEvent } from 'react';
import type { Keys } from './keys';

type KeyboardHandler<T extends HTMLElement = HTMLElement> = (
  event: KeyboardEvent<T>
) => void;

interface Options {
  stopPropagation?: boolean;
  preventDefault?: boolean;
  checker?: 'key' | 'code';
}

export const useKeyboard = <E extends HTMLElement = HTMLElement>(
  handler: KeyboardHandler<E>,
  shortcut?: Keys[],
  options?: Options
): KeyboardHandler<E> => {
  options = {};
  const {
    preventDefault = false,
    stopPropagation = true,
    checker = 'key'
  } = options;

  const eventHandler = (event: KeyboardEvent<E>) => {
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
