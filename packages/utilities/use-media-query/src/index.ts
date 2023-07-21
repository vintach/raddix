import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setIsMatch(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMatch(e.matches);

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return isMatch;
};
