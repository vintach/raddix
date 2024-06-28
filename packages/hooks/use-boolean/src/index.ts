import { useCallback, useState } from 'react';

interface Actions {
  toggle: () => void;
  on: () => void;
  off: () => void;
}

export const useBoolean = (initValue = false): [boolean, Actions] => {
  const [value, setValue] = useState(initValue);

  const toggle = useCallback(() => setValue(x => !x), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, { toggle, on, off }];
};
