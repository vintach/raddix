import { KeyboardEvent } from 'react';
import { Keys } from './keys';

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
    if (preventDefault) {
      event.preventDefault();
    }

    if (stopPropagation) {
      event.stopPropagation();
    }

    if (!shortcut || shortcut.length === 0) {
      handler(event);
      return;
    }

    if (shortcut.includes(event[checker])) {
      handler(event);
    }
  };

  return eventHandler;
};
