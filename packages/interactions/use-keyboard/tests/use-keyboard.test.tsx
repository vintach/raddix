import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useKeyboard } from '@raddix/use-keyboard';

interface ComponentProps {
  onKeyUp: (event: React.KeyboardEvent | KeyboardEvent) => void;
  shortcuts?: string[];
}

const Component: React.FC<ComponentProps> = ({ onKeyUp, shortcuts }) => {
  const onkeyUp = useKeyboard(onKeyUp, shortcuts);

  return <button onKeyUp={onkeyUp} data-testid='btn' />;
};

describe('useKeyboard test:', () => {
  test('should handle keyboard events', () => {
    let events: any[] = [];
    let tree = render(
      <Component onKeyUp={e => events.push({ type: e.type, key: e.key })} />
    );

    const btn = tree.getByTestId('btn');
    fireEvent.keyUp(btn, { key: 'A' });
    fireEvent.keyUp(btn, { key: 'Enter' });
    fireEvent.keyUp(btn, { key: 'C' });
    fireEvent.keyUp(btn, { key: ' ' });

    expect(events).toEqual([
      { type: 'keyup', key: 'A' },
      { type: 'keyup', key: 'Enter' },
      { type: 'keyup', key: 'C' },
      { type: 'keyup', key: ' ' }
    ]);
  });

  test('should handle keyboard events only if enter and space keys are pressed', () => {
    let events: any[] = [];
    let tree = render(
      <Component
        onKeyUp={e => events.push({ type: e.type, key: e.key })}
        shortcuts={['Enter', ' ']}
      />
    );

    const btn = tree.getByTestId('btn');
    fireEvent.keyUp(btn, { key: 'A' });
    fireEvent.keyUp(btn, { key: 'Enter' });
    fireEvent.keyUp(btn, { key: 'C' });
    fireEvent.keyUp(btn, { key: ' ' });

    expect(events).toEqual([
      { type: 'keyup', key: 'Enter' },
      { type: 'keyup', key: ' ' }
    ]);
  });
});
