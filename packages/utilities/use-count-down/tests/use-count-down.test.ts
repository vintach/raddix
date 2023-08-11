import { useCountDown } from '@raddix/use-count-down';
import { renderHook, act } from '@testing-library/react';

jest.useFakeTimers();

// afterEach(() => {
//   jest.runOnlyPendingTimers();
//   jest.useRealTimers();
// });

describe('useCountDown test:', () => {
  test('should print initial values', () => {
    const { result } = renderHook(() => useCountDown(4000, 1000));
    const { value, isFinished, stop, reset } = result.current;

    expect(value).toBe(4000);
    expect(typeof stop).toBe('function');
    // expect(typeof trigger).toBe('function');
    expect(typeof reset).toBe('function');
    expect(isFinished).toBe(false);
  });

  test('should decrement count', () => {
    const initialTime = 60 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 500));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.value).toBe(59000);
  });

  test('should start timer and stop on 0', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

    act(() => {
      jest.advanceTimersByTime(1000); // Advance the first tick
    });

    // Now, use 'act' again to wait for the interval to complete
    act(() => {
      jest.advanceTimersByTime(9000); // Advance the remaining time
    });

    expect(result.current.value).toBe(0);
    expect(result.current.isFinished).toBe(true);
  });

  test('the timer should stop', () => {
    const initialTime = 15 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.value).toBe(14000);

    act(() => {
      result.current.stop();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.value).toBe(14000);
  });

  test('the onTick function should be called at every interval', () => {
    const onTick = jest.fn();
    renderHook(() => useCountDown(10000, 500, { onTick }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onTick).toBeCalledTimes(10);
  });
});
