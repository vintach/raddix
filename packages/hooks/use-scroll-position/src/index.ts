import { type RefObject, useEffect, useState } from 'react';

export interface ScrollPosition {
  x: number | null;
  y: number | null;
}

interface Options {
  target?: RefObject<HTMLElement>;
}

export const useScrollPosition = ({ target }: Options = {}): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const element = target ? target.current : window;

    const handle = () => {
      setScrollPosition({
        x: (target ? target.current?.scrollLeft : window.scrollX) ?? null,
        y: (target ? target.current?.scrollTop : window.scrollY) ?? null
      });
    };
    handle();

    element?.addEventListener('scroll', handle, { passive: true });
    return () => element?.removeEventListener('scroll', handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrollPosition;
};
