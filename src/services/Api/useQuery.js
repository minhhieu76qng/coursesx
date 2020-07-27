import { useState, useEffect } from 'react';
import Api from './api';

const useQuery = ({ method = 'get', url, params, body }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    Api({
      method,
      url,
      params,
      body,
    })
      .then((responseData) => {
        setData(responseData);
        setError(null);
      })
      .catch((errorData) => {
        setData(null);
        setError(errorData);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    loading,
    data,
    error,
  };
};

export default useQuery;
