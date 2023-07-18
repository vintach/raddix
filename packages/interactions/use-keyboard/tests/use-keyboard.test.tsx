import { fireEvent, render, renderHook } from '@testing-library/react';
import { useKeyboard } from '../src/index';

interface ComponentProps {
  onKeyboard: (event: React.KeyboardEvent | KeyboardEvent) => void;
  shortcuts?: string[];
}

interface EventProp {
  type: string;
  key: string;
}

const Component: React.FC<ComponentProps> = ({ onKeyboard, shortcuts }) => {
  const onkeyUp = useKeyboard(onKeyboard, shortcuts);

  return <button onKeyUp={onkeyUp} data-testid='btn' />;
};

const Component2: React.FC<ComponentProps> = ({ onKeyboard, shortcuts }) => {
  const onKeyDown = useKeyboard(onKeyboard, shortcuts, {
    checker: 'code'
  });

  return <button onKeyDown={onKeyDown} data-testid='btn2' />;
};

describe('useKeyboard test:', () => {
  it('should handle keyboard events', () => {
    const events: EventProp[] = [];
    const tree = render(
      <Component onKeyboard={e => events.push({ type: e.type, key: e.key })} />
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

  it('should handle keyboard events only if enter and space keys are pressed', () => {
    const events: EventProp[] = [];
    const tree = render(
      <Component
        onKeyboard={e => events.push({ type: e.type, key: e.key })}
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

  it('should handle keyboard events only if S and G keys are pressed with checker:code property setting', () => {
    const events: EventProp[] = [];
    const tree = render(
      <Component2
        onKeyboard={e => events.push({ type: e.type, key: e.code })}
        shortcuts={['KeyS', 'KeyG']}
      />
    );

    const btn2 = tree.getByTestId('btn2');
    fireEvent.keyDown(btn2, { code: 'KeyS' });
    fireEvent.keyDown(btn2, { code: 'KeyD' });
    fireEvent.keyDown(btn2, { code: 'KeyG' });

    expect(events).toEqual([
      { type: 'keydown', key: 'KeyS' },
      { type: 'keydown', key: 'KeyG' }
    ]);
  });

  it('should allow shortcuts globally', () => {
    const handler = jest.fn();
    renderHook(() => useKeyboard(handler, ['c'], { globalEvent: true }));
    fireEvent.keyDown(document.body, { key: 'c' });

    expect(handler).toBeCalledTimes(1);
  });
});
