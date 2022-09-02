import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import Switch from '@mark-ui/switch';

test('Uncontrolled - should check and uncheck', async () => {
  const { container } = render(
    <Switch.Root>
      <Switch.Thumb />
    </Switch.Root>
  );
  const button = container.querySelector('button') as HTMLButtonElement;

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'true');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'false');
});

test('Default Checked - should check true', async () => {
  const { container } = render(
    <Switch.Root defaultChecked>
      <Switch.Thumb />
    </Switch.Root>
  );
  const button = container.querySelector('button') as HTMLButtonElement;

  expect(button).toHaveAttribute('aria-checked', 'true');
});

test('Controlled - should check and uncheck', async () => {
  const ControlledSwitch = () => {
    const [checked, setChecked] = useState<boolean>(false);
    return (
      <Switch.Root checked={checked} onChecked={setChecked}>
        <Switch.Thumb />
      </Switch.Root>
    );
  };

  const { container } = render(<ControlledSwitch />);
  const button = container.querySelector('button') as HTMLButtonElement;

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'true');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'false');
});

test('Disabled - indicates that the element is disabled', () => {
  const { container } = render(
    <Switch.Root disabled>
      <Switch.Thumb />
    </Switch.Root>
  );
  const button = container.querySelector('button') as HTMLButtonElement;

  expect(button).toHaveAttribute('aria-checked', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'false');

  expect(button).toHaveAttribute('aria-disabled', 'true');
});

test('ReadOnly - indicates that the element is immutable', () => {
  const { container } = render(
    <Switch.Root readOnly>
      <Switch.Thumb />
    </Switch.Root>
  );

  const button = container.querySelector('button') as HTMLButtonElement;

  expect(button).toHaveAttribute('aria-checked', 'false');

  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-checked', 'false');

  expect(button).toHaveAttribute('aria-readonly', 'true');
});

test('Label - you must check and uncheck by clicking on label', () => {
  const LabelSwitch = () => (
    <div>
      <label htmlFor='dev'>Label</label>
      <Switch.Root id='dev'>
        <Switch.Thumb />
      </Switch.Root>
    </div>
  );

  const { container } = render(<LabelSwitch />);

  const label = container.querySelector('label') as HTMLLabelElement;
  const button = container.querySelector('button') as HTMLButtonElement;

  fireEvent.click(label);
  expect(button).toHaveAttribute('aria-checked', 'true');

  fireEvent.click(label);
  expect(button).toHaveAttribute('aria-checked', 'false');
});
