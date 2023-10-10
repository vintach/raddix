import { useToggle } from '../src';
import { act, renderHook } from '@testing-library/react';

describe('useToggle test:', () => {
  test('should print initial value', () => {
    const { result } = renderHook(() => useToggle());
    const [state, setState, toggle] = result.current;

    expect(state).toBe(false);
    expect(typeof setState).toBe('function');
    expect(typeof toggle).toBe('function');
  });

  test('should print custom initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    const [state] = result.current;

    expect(state).toBe(true);
  });

  test('should print the mutated value with setState function', () => {
    const { result } = renderHook(() => useToggle());
    const [state, setState] = result.current;

    expect(state).toBe(false);

    act(() => {
      setState(true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      setState(false);
    });

    expect(result.current[0]).toBe(false);
  });

  test('should print the mutated value with toggle function', () => {
    const { result } = renderHook(() => useToggle(true));
    const [state, _, toogle] = result.current;

    expect(state).toBe(true);

    act(() => {
      toogle();
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      toogle();
    });

    expect(result.current[0]).toBe(true);
  });
});
