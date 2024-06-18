import { useCallback, useEffect, useRef, useState } from 'react';

interface Options extends RequestInit {
  inmediate?: boolean;
  data?: object;
}

interface UseFetchReturn<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  refetch: (opts?: Options) => void;
  abort: () => void;
}

const defaultContentType = { 'Content-Type': 'application/json' };

export const useFetch = <T>(
  url: string,
  { inmediate, method = 'GET', ...options }: Options = {}
): UseFetchReturn<T> => {
  options.headers = { ...defaultContentType, ...options.headers };
  inmediate = inmediate ?? method === 'GET' ? true : false;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const controller = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    controller.current?.abort();
  }, []);

  const refetch = useCallback(
    (optionsRefetch?: Options) => {
      abort();
      controller.current = new AbortController();
      const signal = controller.current.signal;

      const allOptions = { ...options, ...optionsRefetch };
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
    if (inmediate) refetch();
    return () => abort();
  }, [refetch, inmediate, abort]);

  return { isLoading, error, data, refetch, abort };
};
