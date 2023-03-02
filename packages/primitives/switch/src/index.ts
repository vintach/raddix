import { UseSwitch, useSwitchRoot, useSwitchThumb } from './switch';

export { useSwitchThumb, useSwitchRoot as useSwitch  } from './switch';
export { useSwitchState, SwitchProvider } from './switch.provider';
export type { SwitchRootBase as UseSwitchProps, SwitchState } from './switch';



const useSwitch: UseSwitch = {
  Root: useSwitchRoot,
  Thumb: useSwitchThumb
};

export default useSwitch;