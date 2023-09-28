import { useCountDown } from '@raddix/use-count-down';
import { renderHook, act } from '@testing-library/react';

jest.useFakeTimers();

describe('useCountDown test:', () => {
  test('should print initial values', () => {
    const { result } = renderHook(() => useCountDown(4000));
    const [value, { start, stop, reset, add }, indicators] = result.current;

    expect(value).toBe(4000);
    expect(typeof stop).toBe('function');
    expect(typeof start).toBe('function');
    expect(typeof reset).toBe('function');
    expect(typeof add).toBe('function');
    expect(indicators.isRunning).toBe(true);
    expect(indicators.isFinished).toBe(false);
  });

  test('should start timer immediately', () => {
    const initialTime = 60 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(59000);
  });

  test('should start timer and stop on 0', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime));

    act(() => {
      jest.advanceTimersByTime(12000);
    });

    expect(result.current[0]).toBe(0);
  });

  test('should not start the timer immediately', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() =>
      useCountDown(initialTime, { autoStart: false })
    );

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(result.current[0]).toBe(initialTime);

    act(() => {
      result.current[1].start();
      jest.advanceTimersByTime(4000);
    });

    expect(result.current[0]).toBe(6000);
  });

  test('the timer should stop, reset and resume', () => {
    const initialTime = 15 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(14000);

    act(() => {
      result.current[1].stop();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(14000);

    act(() => {
      result.current[1].start();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(12000);

    act(() => {
      result.current[1].reset();
    });

    expect(result.current[0]).toBe(15000);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(14000);
  });

  test('the onTick function should be called at every interval', () => {
    const onTick = jest.fn();
    renderHook(() => useCountDown(10000, { interval: 500, onTick }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onTick).toBeCalledTimes(10);
  });

  test('the onFinished function should be called when the countdown reaches zero', () => {
    const onFinished = jest.fn();
    renderHook(() => useCountDown(5000, { interval: 500, onFinished }));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onFinished).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onFinished).toBeCalled();
  });

  test('should indicate the status of the countdown', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[2].isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    expect(result.current[2].isRunning).toBe(false);
    expect(result.current[2].isFinished).toBe(true);
  });

  test('should add time to the current countdown', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(8000);

    act(() => {
      result.current[1].add(1000);
    });

    expect(result.current[0]).toBe(9000);
  });
});
