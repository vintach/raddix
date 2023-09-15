import { useEffect, useRef } from 'react';

type UseInterval = (callback: () => void, delay: number | null) => void;

export const useInterval: UseInterval = (callback, delay) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;
    const tick = () => {
      savedCallback.current?.();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
