import { useMediaQuery } from '../src/index';
import { renderHook } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';

const newMatchMedia = (query: string): MediaQueryList => {
  return {
    matches: mediaQuery.match(query, { width: window.innerWidth }),
    media: query,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: jest.fn(),
    onchange: null
  };
};

describe('useMediaQuery:', () => {
  beforeEach(() => {
    window.matchMedia = newMatchMedia;
  });

  it('should return true if the media query matches', () => {
    const query = 'only screen and (max-width: 400px)';
    const { result } = renderHook(() => useMediaQuery(query));
    const isMatch = mediaQuery.match(query, { width: window.innerWidth });

    expect(result.current).toEqual(isMatch);
  });
});
