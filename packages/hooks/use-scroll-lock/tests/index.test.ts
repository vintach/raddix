import { renderHook } from '@testing-library/react';
import { useScrollLock } from '../src';

describe('useScrollLock test:', () => {
  beforeAll(() => {
    document.body.style.overflow = 'auto';
  });

  it('should lock and unlock scrolling in the body of the document', () => {
    const { unmount } = renderHook(() => useScrollLock());

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should lock and unlock scrolling in the target element by selector', () => {
    const target = document.createElement('div');
    target.id = 'test';
    document.body.appendChild(target);
    target.style.overflow = 'scroll';

    const { unmount } = renderHook(() => useScrollLock({ target: '#test' }));

    expect(target.style.overflow).toBe('hidden');
    unmount();
    expect(target.style.overflow).toBe('scroll');
  });

  it('Should lock and unlock scrolling in the document body if the target element is not found', () => {
    const { unmount } = renderHook(() => useScrollLock({ target: '#testing' }));

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });
});
