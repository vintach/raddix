import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
};
