import { useState, useEffect } from 'react';

interface BatteryInfo {
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

export type BatteryManager = EventTarget & BatteryInfo;
interface UseBatteryReturn extends BatteryInfo {
  isSupported: boolean;
  isLoading: boolean;
}

declare global {
  interface Navigator {
    readonly getBattery: () => Promise<BatteryManager>;
  }
}

export function useBattery(): UseBatteryReturn {
  const [state, setState] = useState<UseBatteryReturn>({
    isSupported: false,
    isLoading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null
  });

  useEffect(() => {
    const isSupported = 'getBattery' in navigator;
    if (!isSupported) return setState(s => ({ ...s, isLoading: false }));
    let battery: BatteryManager | null = null;

    const handleChange = () => {
      if (battery) {
        setState({
          isSupported: true,
          isLoading: false,
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        });
      }
    };

    navigator.getBattery().then(batteryManager => {
      battery = batteryManager;
      handleChange();

      batteryManager.addEventListener('levelchange', handleChange);
      batteryManager.addEventListener('chargingchange', handleChange);
      batteryManager.addEventListener('chargingtimechange', handleChange);
      batteryManager.addEventListener('dischargingtimechange', handleChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', handleChange);
        battery.removeEventListener('chargingchange', handleChange);
        battery.removeEventListener('chargingtimechange', handleChange);
        battery.removeEventListener('dischargingtimechange', handleChange);
      }
    };
  }, []);

  return state;
}
