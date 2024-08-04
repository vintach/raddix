import { useEffect, useRef, useState } from 'react';

export type UseClipboard = (options?: {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}) => [isCopied: boolean, copy: (text: string) => void];

export const useClipboard: UseClipboard = (options = {}) => {
  const { timeout = 2000, onError, onSuccess } = options;
  const [isCopied, setIsCopied] = useState(false);
  const idTimeout = useRef<NodeJS.Timeout | null>(null);

  const copy = (data: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(data)
        .then(() => {
          setIsCopied(true);
          onSuccess?.();
          idTimeout.current = setTimeout(() => setIsCopied(false), timeout);
        })
        .catch(err => onError?.(err));
    } else {
      onError?.(new Error('navigator.clipboard is not supported'));
    }
  };

  useEffect(() => {
    return () => {
      if (idTimeout.current) clearTimeout(idTimeout.current);
    };
  }, []);

  return [isCopied, copy];
};
