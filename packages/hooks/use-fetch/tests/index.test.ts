/* eslint-disable @typescript-eslint/require-await */
import { renderHook, act } from '@testing-library/react';
import { useFetch } from '../src';
import fetchMock from 'fetch-mock';

const url = 'http://test.com';
const data = { title: 'useFetch' };

describe('useFetch test:', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());
  afterEach(() => fetchMock.restore());

  it('should get the data automatically with a successful request', async () => {
    fetchMock.mock(url, data, { delay: 2000 });
    const { result } = renderHook(() => useFetch(url));

    await act(async () => {});

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await act(async () => jest.advanceTimersByTime(2000));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toStrictEqual(data);
    expect(result.current.isError).toBe(false);
  });

  it('should avoid an immediate request and get the data manually.', async () => {
    const { result } = renderHook(() => useFetch(url, { immediate: false }));
    fetchMock.mock(url, data, { delay: 2000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);

    await act(async () => {
      result.current.execute();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await act(async () => jest.advanceTimersByTime(2000));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toStrictEqual(data);
  });

  it('should return error as true if the request is not successful', async () => {
    fetchMock.mock(url, 500, { delay: 2000 });
    const { result } = renderHook(() => useFetch(url));

    await act(async () => {});

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await act(async () => jest.advanceTimersByTime(2000));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBe(null);
  });

  it('should send a POST request with JSON-encoded data', async () => {
    const { result } = renderHook(() =>
      useFetch(url, { method: 'POST', data })
    );
    fetchMock.post(url, data, { delay: 2000 });

    await act(async () => {
      result.current.execute();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await act(async () => jest.advanceTimersByTime(2000));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toStrictEqual(data);
  });

  it('should be able to cancel a request', async () => {
    fetchMock.mock(url, data, { delay: 5000 });
    const { result } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await act(async () => result.current.abort());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toStrictEqual(null);
  });
});
