import { useLayoutEffect, useRef } from 'react';

interface OriginalStyle {
  overflow: string;
  paddingRight: string;
}

export const useScrollLock = (): void => {
  const originalStyle = useRef<OriginalStyle | null>(null);

  const preventTouch = (e: Event) => {
    e.preventDefault();
    return false;
  };

  useLayoutEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.scrollWidth;
    const paddingRight = window.getComputedStyle(document.body).paddingRight;
    const overflow = window.getComputedStyle(document.body).overflow;
    const right = scrollbarWidth + parseInt(paddingRight, 10);

    originalStyle.current = { overflow, paddingRight };
    document.body.style.paddingRight = `${right}px`;
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      if (originalStyle.current) {
        document.body.style.overflow = originalStyle.current.overflow;
        document.body.style.paddingRight = originalStyle.current.paddingRight;
      }

      document.removeEventListener('touchmove', preventTouch);
    };
  }, []);
};
