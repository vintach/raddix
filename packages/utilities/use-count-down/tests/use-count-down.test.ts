import { useCountDown } from '@raddix/use-count-down';
import { renderHook, act } from '@testing-library/react';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useCountDown test:', () => {
  test('should print initial values', () => {
    const { result } = renderHook(() => useCountDown(10, 1000));
    const { value, stop, trigger, reset, isFinished } = result.current;

    expect(value).toBe(10);
    expect(typeof stop).toBe('function');
    expect(typeof trigger).toBe('function');
    expect(typeof reset).toBe('function');
    expect(isFinished).toBe(false);
  });

  test('should start timer and stop on 0', () => {
    const { result } = renderHook(() =>
      useCountDown(1000, 100, { autoTrigger: true })
    );

    act(() => {
      jest.advanceTimersByTime(100); // Advance the first tick
    });

    // Now, use 'act' again to wait for the interval to complete
    act(() => {
      jest.advanceTimersByTime(900); // Advance the remaining time
    });

    expect(result.current.value).toBe(0);
    expect(result.current.isFinished).toBe(true);
  });
});
