import { useEffect, useState } from 'react';

export const useScrollSpy = (
  items: string[],
  options?: IntersectionObserverInit
): string => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && setActiveId(e.target.id));
    }, options);

    items.forEach(id => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items, options]);

  return activeId;
};
