import { type RefObject, useEffect, useState } from 'react';
import { useEventListener } from '@raddix/use-event-listener';

export interface ScrollPosition {
  x: number | null;
  y: number | null;
}

export interface Options<E extends HTMLElement> {
  target?: RefObject<E> | Document;
}

export const useScrollPosition = <E extends HTMLElement = HTMLDivElement>({
  target = globalThis.document
}: Options<E> = {}): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  });

  const handle = () => {
    const targetElement =
      target instanceof Document ? document.documentElement : target.current;

    setScrollPosition({
      x: targetElement?.scrollLeft ?? null,
      y: targetElement?.scrollTop ?? null
    });
  };

  useEffect(() => {
    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEventListener('scroll', handle, { target, passive: true });

  return scrollPosition;
};
