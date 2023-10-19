import { renderHook } from '@testing-library/react';
import { useTimeout } from '../src';

describe('useTimeout test:', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('the timeout should work', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear the timeout when the component unmounts', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toBeCalled();
    unmount();
    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
  });

  it('should clear the timeout when the delay changes', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useTimeout(callback, delay),
      {
        initialProps: { delay: 1000 }
      }
    );

    expect(callback).not.toBeCalled();
    rerender({ delay: 2000 });
    jest.advanceTimersByTime(1000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(4000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback if the delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, null));

    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
  });

  it('should not execute the callback immediately if the inmediate option is false', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000, false));

    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
  });

  it('should stop the timeout when the clear function is called', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 4000));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    result.current.clear();
    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
  });

  it('should restart the timeout when the reset function is called', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 4000));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    result.current.reset();
    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should execute the callback if the run function is called', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 2000, false));

    jest.advanceTimersByTime(2000);
    expect(callback).not.toBeCalled();
    result.current.run();
    jest.advanceTimersByTime(4000);
    expect(callback).toHaveBeenCalledTimes(1);
    result.current.run();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
