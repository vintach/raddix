import { useCallback, useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number | null,
  inmediate = true
): { clear: () => void; run: () => void } => {
  const savedCallback = useRef(callback);
  const id = useRef<NodeJS.Timeout | null>(null);

  const clear = () => {
    if (!id.current) return;
    clearInterval(id.current);
    id.current = null;
  };

  const run = useCallback(() => {
    if (id.current) return;
    if (delay === null) return;
    id.current = setInterval(() => savedCallback.current(), delay);
  }, [delay]);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (inmediate) run();
    return () => clear();
  }, [run, inmediate]);

  return { clear, run };
};
