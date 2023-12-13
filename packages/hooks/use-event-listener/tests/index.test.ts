import { renderHook, act } from '@testing-library/react';
import { useEventListener } from '../src';

describe('useEventListener test:', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  it('should add event listener in window', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useEventListener('click', callback));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      document.body.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should add event listener in element', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() =>
      useEventListener('click', callback, { target: container })
    );

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      container.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      container.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should add event listener to ref', () => {
    const callback = jest.fn();
    const ref = { current: container };
    renderHook(() => useEventListener('click', callback, { target: ref }));

    act(() => {
      document.body.click();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      container.click();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not add event listener if the target does not have addEventListener', () => {
    const callback = jest.fn();
    const ref = { current: null };
    renderHook(() => useEventListener('click', callback, { target: ref }));

    act(() => {
      document.body.click();
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
