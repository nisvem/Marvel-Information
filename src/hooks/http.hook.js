import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      return await axios.get(url).then(response => {
        setLoading(false);
        return response.data;
      })
      .catch(error => {
        throw new Error(`Could not fetch ${url} - ${error.message}`);
      });
    } catch(e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
    
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {loading, clearError, request, error};
}