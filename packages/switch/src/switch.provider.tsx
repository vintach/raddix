import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { SwitchPropsBase } from './switch.types';

export const SwitchContext = createContext<SwitchPropsBase>({
  checked: false,
  disabled: false
});

export const useSwitch = () => useContext(SwitchContext);

export const SwitchProvider: FC<PropsWithChildren<SwitchPropsBase>> = props => {
  const { checked, disabled, children } = props;

  const config = useMemo(() => ({ checked, disabled }), [checked, disabled]);

  return (
    <SwitchContext.Provider value={config}>{children}</SwitchContext.Provider>
  );
};
