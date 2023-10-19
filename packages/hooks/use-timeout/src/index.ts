import { useCallback, useEffect, useRef } from 'react';

/**
 * A React hook for handling timeouts
 * @param cb The callback function to be executed after the specified timeout.
 * @param delay The duration of the timeout in milliseconds.
 * @param inmediate If it is true, the callback is executed immediately.
 * @see https://raddix.website/hooks/use-timeout
 */
export const useTimeout = (
  cb: () => void,
  delay: number | null,
  inmediate = true
): { clear: () => void; reset: () => void; run: () => void } => {
  const savedCallback = useRef(cb);
  const id = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (!id.current) return;
    clearTimeout(id.current);
    id.current = null;
  }, []);

  const run = useCallback(() => {
    if (id.current) return;
    if (delay === null) return;
    id.current = setTimeout(() => savedCallback.current(), delay);
  }, [delay]);

  const reset = useCallback(() => {
    clear();
    run();
  }, [run, clear]);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    if (inmediate) run();
    return () => clear();
  }, [delay, run, clear, inmediate]);

  return { clear, reset, run };
};
