import { type RefObject, useEffect, useRef } from 'react';

export const useEventListener = <T extends keyof HTMLElementEventMap>(
  target: RefObject<EventTarget> | EventTarget,
  eventType: T,
  callback: (event: HTMLElementEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions
): void => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement = 'current' in target ? target.current : target;

    if (!targetElement?.addEventListener) return;
    const handler = (ev: Event) =>
      savedCallback.current(ev as HTMLElementEventMap[T]);

    targetElement.addEventListener(eventType, handler, options);

    return () => {
      targetElement.removeEventListener(eventType, handler, options);
    };
  }, [target, eventType, options]);
};
