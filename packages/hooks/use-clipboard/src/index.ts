import { useTimeout } from '@raddix/use-timeout';
import { useState } from 'react';

export type UseClipboard = (options?: {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}) => [isCopied: boolean, copy: (text: string) => void];

export const useClipboard: UseClipboard = (options = {}) => {
  const { timeout = 2000, onError, onSuccess } = options;
  const [isCopied, setIsCopied] = useState(false);
  const { run } = useTimeout(() => setIsCopied(false), timeout, false);

  const copy = (data: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(data)
        .then(() => {
          setIsCopied(true);
          onSuccess?.();
          run();
        })
        .catch(err => onError?.(err));
    } else {
      onError?.(new Error('navigator.clipboard is not supported'));
    }
  };

  return [isCopied, copy];
};
