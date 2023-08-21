import { useCountDown } from '@raddix/use-count-down';
import { renderHook, act } from '@testing-library/react';

jest.useFakeTimers();

describe('useCountDown test:', () => {
  test('should print initial values', () => {
    const { result } = renderHook(() => useCountDown(4000, 1000));
    const [value, { start, stop, reset }] = result.current;

    expect(value).toBe(4000);
    expect(typeof stop).toBe('function');
    expect(typeof start).toBe('function');
    expect(typeof reset).toBe('function');
  });

  test('should decrement count', () => {
    const initialTime = 60 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 500));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(59000);
  });

  test('should start timer and stop on 0', () => {
    const initialTime = 10 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.advanceTimersByTime(9000);
    });

    expect(result.current[0]).toBe(0);
  });

  // test('trigger should start the timer', () => {
  //   const initialTime = 10 * 1000;
  //   const { result } = renderHook(() =>
  //     useCountDown(initialTime, 1000, { autoStart: false })
  //   );

  //   act(() => {
  //     jest.advanceTimersByTime(1000); // Advance the first tick
  //   });

  //   expect(result.current.value).toBe(10000);

  //   // Now, use 'act' again to wait for the interval to complete
  //   act(() => {
  //     result.current.trigger();
  //     jest.advanceTimersByTime(4000); // Advance half the remaining time
  //   });

  //   expect(result.current.value).toBe(6000);
  //   expect(result.current.isFinished).toBe(false);
  // });

  test('the timer should stop', () => {
    const initialTime = 15 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(14000);

    act(() => {
      result.current[1].stop();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(14000);
  });

  test('the timer should stop and resume', () => {
    const initialTime = 15 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

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
  });

  test('the timer should stop, reset and resume', () => {
    const initialTime = 15 * 1000;
    const { result } = renderHook(() => useCountDown(initialTime, 1000));

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
    renderHook(() => useCountDown(10000, 500, { onTick }));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(onTick).toBeCalledTimes(10);
  });

  test('the onFinished function should be called when the countdown reaches zero', () => {
    const onFinished = jest.fn();
    renderHook(() => useCountDown(5000, 500, { onFinished }));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onFinished).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onFinished).toBeCalled();
  });
});
