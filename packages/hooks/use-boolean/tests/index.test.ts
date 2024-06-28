import { renderHook, act } from '@testing-library/react';
import { useBoolean } from '../src';

describe('useBoolean test:', () => {
  it('should print the default value', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBe(false);
  });

  it('should set the boolean value to true', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  it('should set the boolean value to false', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);
  });

  it('Should toggle the boolean state.', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });
});
