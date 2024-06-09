import { useState } from 'react';

export interface Options {
  timeout?: number;
  onError?: (err: Error) => void;
}

type UseClipboard = (
  opts?: Options
) => [isCopied: boolean, copyFn: (text: string) => void];

export const useClipboard: UseClipboard = (opts = {}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (data: string) => {
    if (isCopied) return;

    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(data)
        .then(() => setIsCopied(true))
        .catch(err => opts.onError?.(err));
    } else {
      opts.onError?.(
        new Error('useClipboard: navigator.clipboard is not supported')
      );
    }
  };

  return [isCopied, copy];
};
