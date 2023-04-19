import type { Dispatch, SetStateAction } from 'react';
import { useState, useCallback } from 'react';

export const useToggle = (
  /**
   * Initial value
   * @default false
   */
  initialState?: boolean
): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [state, setState] = useState<boolean>(
    initialState === undefined || false
  );

  const toggle = useCallback(() => {
    setState(x => !x);
  }, []);

  return [state, setState, toggle];
};
