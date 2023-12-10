import { renderHook, act } from '@testing-library/react';
import { useScroll } from '../src';

describe('useScroll test:', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  it('should initialize scroll position to (0, 0)', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update scroll position on scroll event', () => {
    const { result } = renderHook(() =>
      useScroll({ target: { current: container } })
    );

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      container.scrollTop = 100;
      container.scrollLeft = 50;
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 50, y: 100 });
  });

  it('should update scroll position on document scroll event', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      document.documentElement.scrollTop = 100;
      document.documentElement.scrollLeft = 50;
      document.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 50, y: 100 });
  });

  it('should not update scroll position if target is null', () => {
    const { result } = renderHook(() => useScroll({ target: null }));

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      document.documentElement.scrollTop = 100;
      document.documentElement.scrollLeft = 50;
      document.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should not update the scroll position if the element does not exist', () => {
    const { result } = renderHook(() =>
      useScroll({ target: { current: null } })
    );

    expect(result.current).toEqual({ x: null, y: null });
  });
});
