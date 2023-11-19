import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../src';

describe('useDebounce test:', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should update the debounced value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: { value: 'initial' }
      }
    );

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'updated' });
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
