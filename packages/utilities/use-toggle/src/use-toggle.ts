import { useState, useCallback, Dispatch, SetStateAction } from 'react';

export const useToggle = (
  /**
   * Initial value
   * @default false
   */
  initialState?: boolean
): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [state, setState] = useState<boolean>(initialState || false);

  const toggle = useCallback(() => setState(x => !x), []);

  return [state, setState, toggle];
};
