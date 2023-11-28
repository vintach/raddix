import { act, renderHook } from '@testing-library/react';
import { useWindowSize } from '../src';

const onResize = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;

  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
};

describe('useWindowSize test:', () => {
  it('should update window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    // Simulate window resize
    onResize(1024, 768);

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    onResize(375, 667);

    expect(result.current.width).toBe(375);
    expect(result.current.height).toBe(667);
  });
});
