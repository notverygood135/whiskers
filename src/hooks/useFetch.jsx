import { useState, useEffect } from 'react';
import { set } from 'react-hook-form';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    fetch(url, {
      credentials: 'include'
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      setData(data);
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [url]);

  return {data, loading, error};
}

export default useFetch;