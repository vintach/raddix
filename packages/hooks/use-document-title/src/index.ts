import { useRef } from 'react';
import { useIsomorphicEffect } from '@raddix/use-isomorphic-effect';

export const useDocumentTitle = (title: string, restoreTitle = true): void => {
  const defaultTitle = useRef<string | null>(null);

  useIsomorphicEffect(() => {
    defaultTitle.current = window.document.title;

    return () => {
      if (restoreTitle && defaultTitle.current) {
        window.document.title = defaultTitle.current;
      }
    };
  }, [restoreTitle]);

  useIsomorphicEffect(() => {
    document.title = title.trim();
  }, [title]);
};
