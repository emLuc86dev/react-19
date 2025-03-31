import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce any fast-changing value.
 * Useful for search inputs, filters, etc.
 *
 * @param value - The value you want to debounce
 * @param delay - Delay in milliseconds (default is 500ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function cancels the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
