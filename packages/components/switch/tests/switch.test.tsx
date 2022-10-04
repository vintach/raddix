import { renderHook } from '@testing-library/react';
import { useSwitchRoot, useSwitchThumb } from '@mark-ui/switch';

describe('useSwitch tests', () => {
  it('default values', () => {
    const { result } = renderHook(() => useSwitchRoot({}));
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.elementProps['role']).toBe('switch');
    expect(result.current.elementProps['aria-checked']).toBe(false);
    expect(result.current.elementProps['data-state']).toBe('unchecked');

    expect(resultThumb.current.elementProps['data-state']).toBe('unchecked');
  });

  it('values others than button element', () => {
    const { result } = renderHook(() =>
      useSwitchRoot({
        elementType: 'div'
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.elementProps['role']).toBe('switch');
    expect(result.current.elementProps['aria-checked']).toBe(false);
    expect(result.current.elementProps['data-state']).toBe('unchecked');

    expect(resultThumb.current.elementProps['data-state']).toBe('unchecked');
  });

  it('indicates that the element is disabled', () => {
    const { result } = renderHook(() =>
      useSwitchRoot({
        disabled: true
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.elementProps['role']).toBe('switch');
    expect(result.current.elementProps['aria-checked']).toBe(false);
    expect(result.current.elementProps['data-state']).toBe('unchecked');
    expect(result.current.elementProps['aria-disabled']).toBe(true);
    expect(result.current.elementProps['data-disabled']).toBe(true);

    expect(resultThumb.current.elementProps['data-state']).toBe('unchecked');
    expect(resultThumb.current.elementProps['data-disabled']).toBe(true);
  });
});
