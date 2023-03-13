import { act, renderHook } from '@testing-library/react';
import {
  useSwitch,
  useSwitchThumb,
  SwitchProvider,
  useSwitchState
} from '@raddix/switch';

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
    const { result } = renderHook(() => useSwitch({}));
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.switchProps['role']).toBe('switch');
    expect(result.current.switchProps['aria-checked']).toBe(false);
    expect(result.current.switchProps['data-state']).toBe('unchecked');

    expect(resultThumb.current.switchThumbProps['data-state']).toBe(
      'unchecked'
    );
  });

  it('values others than button element', () => {
    const { result } = renderHook(() =>
      useSwitch({
        elementType: 'div'
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.switchProps['role']).toBe('switch');
    expect(result.current.switchProps['aria-checked']).toBe(false);
    expect(result.current.switchProps['data-state']).toBe('unchecked');

    expect(resultThumb.current.switchThumbProps['data-state']).toBe(
      'unchecked'
    );
  });

  it('indicates that the element is disabled', () => {
    const { result } = renderHook(() =>
      useSwitch({
        disabled: true
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.switchProps['role']).toBe('switch');
    expect(result.current.switchProps['aria-checked']).toBe(false);
    expect(result.current.switchProps['data-state']).toBe('unchecked');
    expect(result.current.switchProps['aria-disabled']).toBe(true);
    expect(result.current.switchProps['data-disabled']).toBe(true);

    expect(resultThumb.current.switchThumbProps['data-state']).toBe(
      'unchecked'
    );
    expect(resultThumb.current.switchThumbProps['data-disabled']).toBe(true);
  });

  it('indicates that the element is immutable', () => {
    const { result } = renderHook(() =>
      useSwitch({
        readOnly: true,
        defaultChecked: true
      })
    );
    const { result: resultThumb } = renderHook(() =>
      useSwitchThumb(result.current.state)
    );

    expect(result.current.switchProps['role']).toBe('switch');
    expect(result.current.switchProps['aria-checked']).toBe(true);
    expect(result.current.switchProps['data-state']).toBe('checked');
    expect(result.current.switchProps['aria-readonly']).toBe(true);

    expect(resultThumb.current.switchThumbProps['data-state']).toBe('checked');
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
