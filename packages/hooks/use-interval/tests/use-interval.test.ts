import { renderHook } from '@testing-library/react';
import { useInterval } from '../src';

describe('useInterval test:', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('the interval should work', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should clear the interval when the component unmounts', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toBeCalled();
    unmount();
    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
  });

  it('should clear the interval when the delay changes', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 }
      }
    );

    expect(callback).not.toBeCalled();
    rerender({ delay: 2000 });
    jest.advanceTimersByTime(1000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear the interval when the immediate changes', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ immediate }) => useInterval(callback, 1000, immediate),
      {
        initialProps: { immediate: true }
      }
    );

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    rerender({ immediate: false });
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop the interval when the clear function is called', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    result.current.clear();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should run the interval when the run function is called', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback, 1000, false));

    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
    result.current.run();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    result.current.run();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
