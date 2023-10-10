import { useCallback, useEffect, useRef } from 'react';

export interface IntervalResult {
  /** Clear interval and stop the execution  */
  clear: () => void;
  /** Execute the interval */
  run: () => void;
}

type UseInterval = (
  callback: () => void,
  delay: number,
  inmediate?: boolean
) => IntervalResult;

export const useInterval: UseInterval = (callback, delay, inmediate = true) => {
  const savedCallback = useRef(callback);
  const id = useRef<NodeJS.Timeout | null>(null);

  const clearId = () => {
    if (!id.current) return;
    clearInterval(id.current);
    id.current = null;
  };

  const run = useCallback(() => {
    if (id.current) return;
    const tick = () => savedCallback.current();

    id.current = setInterval(tick, delay);
  }, [delay]);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (inmediate) run();
    return () => clearId();
  }, [run, inmediate]);

  return { clear: clearId, run };
};
