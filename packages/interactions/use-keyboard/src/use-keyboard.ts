import { KeyboardEvent } from 'react';
import { Keys } from './keys';

type KeyboardHandler<T extends HTMLElement = HTMLElement> = (
  event: KeyboardEvent<T>
) => void;

export const useKeyboard = <E extends HTMLElement = HTMLElement>(
  handler: KeyboardHandler<E>,
  shortcut?: Keys[]
): KeyboardHandler<E> => {
  const handleKeyboard = (event: KeyboardEvent<E>) => {
    if (!shortcut || shortcut.length === 0) {
      handler(event);
      return;
    }

    if (shortcut.includes(event.key)) {
      handler(event);
    }
  };

  return handleKeyboard;
};
