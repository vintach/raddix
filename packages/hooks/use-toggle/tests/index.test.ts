import { act, renderHook } from '@testing-library/react';
import { useToggle } from '../src';

describe('useToggle test:', () => {
  test('should print initial value', () => {
    const { result } = renderHook(() => useToggle(['day', 'night']));
    const [state, toggle, setState] = result.current;

    expect(state).toBe('day');
    expect(typeof toggle).toBe('function');
    expect(typeof setState).toBe('function');
  });

  test('should use the first option as default', () => {
    const { result } = renderHook(() => useToggle(['day', 'night']));
    const [state] = result.current;

    expect(state).toBe('day');
  });

  test('should use the second parameter as default value', () => {
    const { result } = renderHook(() => useToggle(['day', 'night'], 'night'));
    const [state] = result.current;

    expect(state).toBe('night');
  });

  test('should print the mutated value with setState function', () => {
    const { result } = renderHook(() => useToggle(['light', 'dark', 'system']));
    const [, , setState] = result.current;

    act(() => setState('system'));
    expect(result.current[0]).toBe('system');

    act(() => setState('dark'));
    expect(result.current[0]).toBe('dark');
  });

  test('should print the mutated value with toggle function', () => {
    const { result } = renderHook(() => useToggle(['light', 'dark', 'system']));
    const [, toogle] = result.current;

    act(() => toogle());
    expect(result.current[0]).toBe('dark');

    act(() => toogle());
    expect(result.current[0]).toBe('system');
  });
});
