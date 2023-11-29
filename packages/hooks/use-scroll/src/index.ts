import { type RefObject, useEffect, useState } from 'react';
import { useEventListener } from '@raddix/use-event-listener';

export interface ScrollPosition {
  x: number | null;
  y: number | null;
}

export interface Options<E extends HTMLElement> {
  target?: RefObject<E> | Window;
}

export const useScroll = <E extends HTMLElement = HTMLDivElement>({
  target = window
}: Options<E>): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: null,
    y: null
  });

  const handle = () => {
    let positions: ScrollPosition = { x: null, y: null };
    if (target instanceof Window) {
      positions = { x: target.scrollX, y: target.scrollY };
    } else {
      if (!target.current) return;
      positions = { x: target.current.scrollLeft, y: target.current.scrollTop };
    }
    setScrollPosition(positions);
  };

  useEffect(() => {
    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEventListener(target, 'scroll', handle);

  return scrollPosition;
};
