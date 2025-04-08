import { useEffect, useState } from 'react';
import { httpClient } from '../lib/api/httpClient.ts';
import { AxiosError } from 'axios';

type UseFetchResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient<unknown, T>({
          url,
        });

        setData(response.data);
      } catch (err: unknown) {
        setError((err as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
};
export default useFetch;
