import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { Props } from './switch.types';

export const SwitchContext = createContext<Props>({
  checked: false,
  disabled: false
});

export const useSwitch = () => useContext(SwitchContext);

export const SwitchProvider: FC<PropsWithChildren<Props>> = props => {
  const { checked, disabled, children } = props;

  const config = useMemo(() => ({ checked, disabled }), [checked, disabled]);

  return (
    <SwitchContext.Provider value={config}>{children}</SwitchContext.Provider>
  );
};
