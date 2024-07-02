import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
type ReturnValue<T> = [T, () => void, Dispatch<SetStateAction<T>>];

export const useToggle = <T>(options: T[], initValue?: T): ReturnValue<T> => {
  const [value, setValue] = useState(initValue ?? options[0]);

  const toggle = useCallback(() => {
    setValue(prev => {
      const currentIndex = options.indexOf(prev);
      const nextIndex = (currentIndex + 1) % options.length;
      return options[nextIndex];
    });
  }, [options]);

  return [value, toggle, setValue];
};
