import { useLayoutEffect, useRef } from 'react';

interface UseScrollLockOptions {
  target?: string;
}

interface OriginalStyle {
  overflow: string;
  paddingRight: string;
}

export const useScrollLock = ({ target }: UseScrollLockOptions = {}): void => {
  const originalStyle = useRef<OriginalStyle | null>(null);

  useLayoutEffect(() => {
    const element: HTMLElement = target
      ? document.querySelector(target) ?? document.body
      : document.body;

    const width =
      element === document.body ? window.innerWidth : element.offsetWidth;
    const scrollbarWidth = width - element.scrollWidth;
    const paddingRight = window.getComputedStyle(element).paddingRight;
    const overflow = window.getComputedStyle(element).overflow;
    const right = scrollbarWidth + parseInt(paddingRight, 10) || 0;

    originalStyle.current = { overflow, paddingRight };
    element.style.paddingRight = `${right}px`;
    element.style.overflow = 'hidden';

    return () => {
      if (originalStyle.current) {
        element.style.overflow = originalStyle.current.overflow;
        element.style.paddingRight = originalStyle.current.paddingRight;
      }
    };
  }, [target]);
};
