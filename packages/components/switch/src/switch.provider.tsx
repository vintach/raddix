import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { Props } from './switch';

export const SwitchContext = createContext<Props>({
  checked: false
});

export const useSwitchState = () => useContext(SwitchContext);

export const SwitchProvider: FC<PropsWithChildren<Props>> = props => {
  const { checked, disabled, isDisabled, children } = props;

  const config = useMemo(
    () => ({ checked, disabled, isDisabled }),
    [checked, disabled, isDisabled]
  );

  return (
    <SwitchContext.Provider value={config}>{children}</SwitchContext.Provider>
  );
};
