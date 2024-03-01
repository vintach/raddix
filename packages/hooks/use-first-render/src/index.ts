import { useEffect, useRef } from 'react';

export const useFirstRender = (): boolean => {
  const isFirst = useRef<boolean>(true);

  useEffect(() => {
    isFirst.current = false;
  }, []);

  return isFirst.current;
};
