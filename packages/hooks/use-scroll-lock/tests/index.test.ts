/* eslint-disable @typescript-eslint/unbound-method */
import { renderHook } from '@testing-library/react';
import { useScrollLock } from '../src';

describe('useScrollLock test:', () => {
  beforeEach(() => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';

    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should block the scroll and add the touchmove event', () => {
    const { unmount } = renderHook(() => useScrollLock());
    const touchMoveEvent = new Event('touchmove');
    const scrollbarWidth = window.innerWidth - document.body.scrollWidth;
    touchMoveEvent.preventDefault = jest.fn();
    document.dispatchEvent(touchMoveEvent);

    expect(touchMoveEvent.preventDefault).toHaveBeenCalled();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.paddingRight).toBe(`${scrollbarWidth}px`);

    expect(document.addEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function),
      { passive: false }
    );

    unmount();
    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.paddingRight).toBe('0px');

    expect(document.removeEventListener).toHaveBeenCalledWith(
      'touchmove',
      expect.any(Function)
    );
  });
});
