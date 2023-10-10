import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string | number): boolean => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const getQueryValue = (md: string | number) => {
    if (typeof md === 'string') return md;
    return `(min-width: ${md}px)`;
  };

  useEffect(() => {
    const newQuery = getQueryValue(query);
    const mql = window.matchMedia(newQuery);
    setIsMatch(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMatch(e.matches);

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return isMatch;
};
