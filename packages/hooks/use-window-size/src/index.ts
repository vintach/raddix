import { useEffect, useState } from 'react';
import { useEventListener } from '@raddix/use-event-listener';

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEventListener('resize', handleResize);

  return windowSize;
};
