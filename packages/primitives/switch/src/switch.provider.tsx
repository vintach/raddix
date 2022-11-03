import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { SwitchState } from './switch';

export const SwitchContext = createContext<SwitchState>({
  checked: false
});

export const useSwitchState = () => useContext(SwitchContext);

export const SwitchProvider: FC<PropsWithChildren<SwitchState>> = props => {
  const { checked, disabled, isDisabled, children } = props;

  const config = useMemo(
    () => ({ checked, disabled, isDisabled }),
    [checked, disabled, isDisabled]
  );

  return (
    <SwitchContext.Provider value={config}>{children}</SwitchContext.Provider>
  );
};
