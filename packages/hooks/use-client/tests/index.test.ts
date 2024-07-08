import { renderHook } from '@testing-library/react';
import { useClient } from '../src';

describe('useClient test:', () => {
  test('should be true', () => {
    const { result } = renderHook(() => useClient(), { hydrate: true });

    expect(result.current).toBe(true);
  });
});
