import { useCallback } from "react";

export function useLocalStorageObject<T>(key: string) {
  const setItem = useCallback(
    (data: T) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));
      }
    },
    [key],
  );

  const getItem = useCallback((): T | null => {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [key]);

  const clearItem = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }, [key]);

  return { setItem, getItem, clearItem };
}
