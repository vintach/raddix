import { act, renderHook } from '@testing-library/react';
import {
  useSwitchRoot,
  useSwitchThumb,
  SwitchProvider,
  useSwitchState
} from '@mark-ui/switch';
import { ReactNode } from 'react';
interface PropsChildren {
  children?: ReactNode;
}
interface PropsProv {
  disabled?: boolean;
  checked?: boolean;
  isDisabled?: boolean;
}

interface Props extends PropsChildren, PropsProv {}

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

  it('indicates that the element is immutable', () => {
    const { result } = renderHook(() =>
      useSwitchRoot({
        readOnly: true,
        defaultChecked: true
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.elementProps['role']).toBe('switch');
    expect(result.current.elementProps['aria-checked']).toBe(true);
    expect(result.current.elementProps['data-state']).toBe('checked');
    expect(result.current.elementProps['aria-readonly']).toBe(true);

    expect(resultThumb.current.elementProps['data-state']).toBe('checked');
  });

  it('receiving values from switchProvider', () => {
    const { result } = renderHook(() => useSwitchState(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <SwitchProvider checked={true} disabled={false}>
          {children}
        </SwitchProvider>
      )
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.disabled).toBe(false);
  });
});
