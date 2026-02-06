import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bylaw-bot-mapbox-token';

export function useMapboxToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setToken(stored);
    setIsLoading(false);
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  return {
    token,
    isLoading,
    hasToken: !!token,
    saveToken,
    clearToken,
  };
}
