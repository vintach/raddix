import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
type ReturnValue<T> = [T, () => void, Dispatch<SetStateAction<T>>];

export const useToggle = <T>(values: T[], initValue?: T): ReturnValue<T> => {
  const [value, setValue] = useState(initValue ?? values[0]);

  const toggle = useCallback(() => {
    setValue(prev => {
      const currentIndex = values.indexOf(prev);
      const nextIndex = (currentIndex + 1) % values.length;
      return values[nextIndex];
    });
  }, [values]);

  return [value, toggle, setValue];
};
