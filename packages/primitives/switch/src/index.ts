import { useSwitchRoot, useSwitchThumb } from './switch';
import { UseSwitch } from './types';

export { useSwitchThumb, useSwitchRoot as useSwitch } from './switch';
export { useSwitchState, SwitchProvider } from './switch.provider';
export type { SwitchRootBase as UseSwitchProps, SwitchState } from './types';

const useSwitch: UseSwitch = {
  Root: useSwitchRoot,
  Thumb: useSwitchThumb
};

export default useSwitch;
