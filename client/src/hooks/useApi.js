import { useState, useEffect } from 'react';
import { fetchData } from '../services/apiService';

export default function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await fetchData(endpoint, {
          method: options.method || 'GET', // Default to GET if not specified
          headers: {
            'Content-Type': 'application/json',
            ...options.headers, // Spread in any additional headers
          },
          body: options.body ? JSON.stringify(options.body) : null, // Stringify body if present
        });

        const json = await result.json();

        setData(json.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [endpoint, options]);

  return { loading, error, data };
};
