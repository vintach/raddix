import { renderHook } from '@testing-library/react';
import { useFirstRender } from '../src/index';

describe('useFirstRender test:', () => {
  it('should return true on the first render', () => {
    const { result } = renderHook(() => useFirstRender());
    expect(result.current).toBe(true);
  });

  it('should return false on subsequent render', () => {
    const { result, rerender } = renderHook(() => useFirstRender());
    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
