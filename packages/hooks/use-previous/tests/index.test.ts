import { renderHook } from '@testing-library/react';
import { usePrevious } from '../src';

describe('usePrevious test:', () => {
  it('should returns undefined on initial render', () => {
    const { result } = renderHook(() => usePrevious(0));

    expect(result.current).toBeUndefined();
  });

  it('should return previous value', () => {
    const { result, rerender } = renderHook(state => usePrevious(state), {
      initialProps: 0
    });

    rerender(1);
    expect(result.current).toBe(0);

    rerender(2);
    expect(result.current).toBe(1);
  });
});
