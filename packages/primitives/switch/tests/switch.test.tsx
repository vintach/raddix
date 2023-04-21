import { fireEvent, render, screen } from '@testing-library/react';
import { useSwitch } from '@raddix/switch';
import type { UseSwitchProps } from '@raddix/switch';
import '@testing-library/jest-dom';

const Switch = (props: UseSwitchProps) => {
  const { switchProps } = useSwitch({
    as: 'button',
    ...props
  });

  return <button {...switchProps}></button>;
};

describe('useSwitch tests:', () => {
  test('the switch should be shown in the document', () => {
    render(<Switch />);

    const switchs = screen.getByRole('switch');

    expect(switchs).toBeInTheDocument();
  });

  test('should display checked in true', () => {
    render(<Switch checked />);

    const switchs = screen.getByRole('switch', {
      checked: true
    });

    expect(switchs).toBeInTheDocument();
  });

  test('should be disabled', () => {
    render(<Switch disabled />);

    const switchs = screen.getByRole('switch');

    expect(switchs).toBeDisabled();
  });

  test('should be the immutable selection.', () => {
    render(<Switch readOnly />);

    const switchs = screen.getByRole('switch', { checked: false });

    fireEvent.click(switchs);

    expect(switchs).not.toBeChecked();
    expect(switchs).not.toBeDisabled();
  });

  test('should support keyboard interactions: Space and Enter', () => {
    render(<Switch checked />);

    const switchs = screen.getByRole('switch', { checked: true });
    expect(switchs).toBeChecked();

    fireEvent.keyUp(switchs, { key: 'Enter' });
    expect(switchs).not.toBeChecked();

    fireEvent.keyUp(switchs, { key: ' ' });
    expect(switchs).toBeChecked();
  });
});
