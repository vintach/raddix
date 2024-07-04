/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useBattery } from '../src';

const events: Record<string, () => void> = {};
const batteryManager = {
  charging: true,
  chargingTime: 0,
  dischargingTime: 5,
  level: 1,
  addEventListener: (type: string, callback: () => void) => {
    events[type] = callback;
  },
  removeEventListener: (type: string, callback: () => void) => {
    if (events[type] === callback) {
      delete events[type];
    }
  },
  dispatchEvent: (event: Event) => {
    events[event.type]?.();
    return true;
  }
};
const getBatteryMock = jest.fn(() => Promise.resolve(batteryManager));

describe('useBattery test:', () => {
  beforeEach(() => {
    // navigator.getBattery mock
    Object.assign(navigator, {
      getBattery: getBatteryMock
    });
  });

  it('should handle levelchange event', async () => {
    const { result } = renderHook(useBattery);

    act(() => {
      batteryManager.level = 2;
      batteryManager.dispatchEvent(new Event('levelchange'));
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        charging: true,
        chargingTime: 0,
        dischargingTime: 5,
        level: 2,
        isLoading: false,
        isSupported: true
      })
    );
  });

  it('should handle chargingchange event', async () => {
    const { result } = renderHook(useBattery);

    act(() => {
      batteryManager.charging = false;
      batteryManager.dispatchEvent(new Event('chargingchange'));
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        charging: false,
        chargingTime: 0,
        dischargingTime: 5,
        level: 2,
        isLoading: false,
        isSupported: true
      })
    );
  });

  it('should handle chargingtimechange event', async () => {
    const { result } = renderHook(useBattery);

    act(() => {
      batteryManager.chargingTime = 1;
      batteryManager.dispatchEvent(new Event('chargingtimechange'));
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        charging: false,
        chargingTime: 1,
        dischargingTime: 5,
        level: 2,
        isLoading: false,
        isSupported: true
      })
    );
  });

  it('should handle dischargingtimechange event', async () => {
    const { result } = renderHook(useBattery);

    act(() => {
      batteryManager.dischargingTime = 6;
      batteryManager.dispatchEvent(new Event('dischargingtimechange'));
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        charging: false,
        chargingTime: 1,
        dischargingTime: 6,
        level: 2,
        isLoading: false,
        isSupported: true
      })
    );
  });

  it('should handle when navigator.clipboard is not available', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    delete (navigator as any).getBattery;
    const { result } = renderHook(useBattery);

    await waitFor(() =>
      expect(result.current).toEqual({
        isLoading: false,
        isSupported: false,
        level: null,
        charging: null,
        chargingTime: null,
        dischargingTime: null
      })
    );
  });
});
