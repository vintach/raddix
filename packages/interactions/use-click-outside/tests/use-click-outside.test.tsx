import { createRef } from 'react';
import { renderHook, fireEvent, render, screen } from '@testing-library/react';
import { useClickOutside } from '@raddix/use-click-outside';

describe('useClickOutside', () => {
  it('should call the function when the click is outside the element', () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    render(<div ref={ref}></div>);

    renderHook(() => useClickOutside(ref, handler));
    fireEvent.mouseDown(document.body);

    expect(handler).toBeCalledTimes(1);
  });

  it('should not call the function when the element is clicked', () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    render(<div ref={ref} data-testid='container'></div>);

    renderHook(() => useClickOutside(ref, handler));
    fireEvent.mouseDown(screen.getByTestId('container'));

    expect(handler).not.toBeCalled();
  });
});
