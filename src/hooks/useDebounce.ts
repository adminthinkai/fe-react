import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number, callback?: () => void): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 800);
    if (callback) {
      callback();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
