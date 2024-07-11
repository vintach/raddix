import { useLayoutEffect } from 'react';
import { useIsomorphicEffect } from '../src';

describe('useIsomorphicEffect test:', () => {
  it('should be equal useLayoutEffect', () => {
    expect(useIsomorphicEffect).toBe(useLayoutEffect);
  });
});
