import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (
  cb: () => void,
  delay: number
): { clear: () => void; reset: () => void } => {
  const savedCallback = useRef(cb);
  const id = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (!id.current) return;
    clearTimeout(id.current);
    id.current = null;
  }, []);

  const run = useCallback(() => {
    const tick = () => savedCallback.current();
    id.current = setTimeout(tick, delay);
  }, [delay]);

  const reset = useCallback(() => {
    clear();
    run();
  }, [run, clear]);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    run();
    return () => clear();
  }, [delay, run, clear]);

  return { clear, reset };
};
