import { useCounter } from '../src/index';
import { renderHook, act } from '@testing-library/react';

describe('useCounter test:', () => {
  test('should print initial values', () => {
    const { result } = renderHook(() => useCounter(0));
    const [value, { inc, dec, reset }] = result.current;

    expect(value).toBe(0);
    expect(typeof inc).toBe('function');
    expect(typeof dec).toBe('function');
    expect(typeof reset).toBe('function');
  });

  test('should increment and decrement the counter', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc();
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1].dec();
    });

    expect(result.current[0]).toBe(0);
  });

  test('should increment and decrement the counter by 5', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(5);
    });

    expect(result.current[0]).toBe(5);

    act(() => {
      result.current[1].dec(5);
    });

    expect(result.current[0]).toBe(0);
  });

  test('should reset the counter', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(5);
    });

    expect(result.current[0]).toBe(5);

    act(() => {
      result.current[1].reset();
    });

    expect(result.current[0]).toBe(0);
  });

  test('should set the counter to min value', () => {
    const { result } = renderHook(() => useCounter(0, { min: 5 }));

    act(() => {
      result.current[1].dec(10);
    });

    expect(result.current[0]).toBe(5);
  });

  test('should set the counter to max value', () => {
    const { result } = renderHook(() => useCounter(0, { max: 5 }));

    act(() => {
      result.current[1].inc(10);
    });

    expect(result.current[0]).toBe(5);
  });

  test('should set the counter to given value', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].set(10);
    });

    expect(result.current[0]).toBe(10);
  });
});
