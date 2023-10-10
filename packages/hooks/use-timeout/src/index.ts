import { useEffect, useRef } from 'react';

type UseTimeout = (cb: () => void, delay: number) => () => void;

export const useTimeout: UseTimeout = (cb, delay) => {
  const savedCallback = useRef(cb);
  const id = useRef<NodeJS.Timeout | null>(null);

  const clearId = () => {
    if (!id.current) return;
    clearTimeout(id.current);
    id.current = null;
  };

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    id.current = setTimeout(tick, delay);
    return () => clearId();
  }, [delay]);

  return clearId;
};
