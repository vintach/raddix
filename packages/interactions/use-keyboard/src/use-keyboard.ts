import { Keys } from './keys';

type KeyboardHandler = (event: React.KeyboardEvent | KeyboardEvent) => void;

type HandleKeyboard = ((event: React.KeyboardEvent<HTMLElement>) => void)[];

type UseKeyboard = (
  handler: KeyboardHandler,
  shortcut?: Keys[]
) => HandleKeyboard;

export const useKeyboard: UseKeyboard = (handler, shortcut) => {
  const handleKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!shortcut || shortcut.length === 0) {
      handler(event);
      return;
    }

    if (shortcut.includes(event.key)) {
      handler(event);
    }
  };

  return [handleKeyboard];
};
