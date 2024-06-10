/* eslint-disable @typescript-eslint/require-await, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from '../src';

const writeTextMock = jest.fn();

describe('useClipboard test:', () => {
  beforeAll(() => {
    jest.useFakeTimers();

    // navigator.clipboard.writeText mock
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should copy text to clipboard', async () => {
    writeTextMock.mockResolvedValue('Success');
    const { result } = renderHook(() => useClipboard({ timeout: 0 }));

    await act(async () => {
      result.current[1]('test');
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
  });

  it('should update isCopied state when content is copied to clipboard', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe(true);
  });

  it('should reset isCopied state after timeout', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current[0]).toBe(false);
  });

  it('should call onSuccess when the copy is successful.', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useClipboard({ onSuccess }));

    await act(async () => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe(true);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should call onError when the copy fail', async () => {
    writeTextMock.mockRejectedValue(new Error('Copy to clipboard failed'));

    const onError = jest.fn();
    const { result } = renderHook(() => useClipboard({ onError }));

    await act(async () => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe(false);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error('Copy to clipboard failed'));
  });

  it('should call onError when navigator.clipboard is not available', async () => {
    delete (navigator as any).clipboard;

    const onError = jest.fn();
    const { result } = renderHook(() => useClipboard({ onError }));

    await act(async () => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe(false);
    expect(onError).toHaveBeenCalledTimes(1);

    expect(onError).toHaveBeenCalledWith(
      new Error('navigator.clipboard is not supported')
    );
  });
});
