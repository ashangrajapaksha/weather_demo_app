import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T>(fetchFunction: () => Promise<T>): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction();
        setData(response);
      } catch (err) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetch;
