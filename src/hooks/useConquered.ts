import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "legends-conquered";

export const useConquered = () => {
  const [conquered, setConquered] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...conquered]));
  }, [conquered]);

  const toggleConquered = useCallback((id: string) => {
    setConquered(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isConquered = useCallback((id: string) => conquered.has(id), [conquered]);

  return { conquered, toggleConquered, isConquered, conqueredCount: conquered.size };
};
