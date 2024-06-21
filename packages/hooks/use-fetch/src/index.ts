import { useCallback, useEffect, useRef, useState } from 'react';

interface Options extends RequestInit {
  immediate?: boolean;
  data?: object;
}

interface UseFetchReturn<T> {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: T | null;
  execute: (opts?: Options) => void;
  abort: () => void;
}

export const useFetch = <T>(
  url: string,
  { immediate, method = 'GET', ...opts }: Options = {}
): UseFetchReturn<T> => {
  immediate = immediate ?? method === 'GET' ? true : false;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const controller = useRef<AbortController | null>(null);

  const abort = () => controller.current?.abort();

  const execute = useCallback(
    (reqOptions?: Options) => {
      abort();
      controller.current = new AbortController();
      const signal = controller.current.signal;

      const allOptions = { ...opts, ...reqOptions };
      const { body: reqBody, data: reqData, ...resOptions } = allOptions;
      const body = !reqData ? reqBody : JSON.stringify(reqData);

      setIsLoading(true);
      return fetch(url, { signal, method, body, ...resOptions })
        .then(res => res.json())
        .then((res: T) => setData(res))
        .catch((err: Error) => {
          if (err.name === 'AbortError') return;
          setData(null);
          setError(err);
        })
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  useEffect(() => {
    if (immediate) execute();
    return () => abort();
  }, [execute, immediate]);

  return { isLoading, error, data, execute, abort, isError: !error };
};
