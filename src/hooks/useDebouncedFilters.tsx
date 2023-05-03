import { useCallback } from "react";

/**
 * debounced version of the provided callback function to limit
 * the rate at which it is called. The debounced callback is returned as
 * a function that can be called by the component.
 *
 * @param callback - The callback function to be debounced.
 * @param delay - The delay (in milliseconds) for the debounced callback.
 * @returns The debounced callback function.
 */

const useDebouncedFilters = (callback: () => void, delay: number) => {

  // Create the debounced version of the callback function using the
  // useCallback hook to memoize it and prevent unnecessary re-renders.
  const debouncedCallback = useCallback(() => {

    // Use setTimeout to delay the execution of the callback function by
    const handler = setTimeout(callback, delay);

    // Return a cleanup function that clears the timeout when the component
    // is unmounted or the dependencies change.
    return () => {
      clearTimeout(handler);
    };
    
  }, [callback, delay]);

  // Return the debounced callback function to the component.
  return debouncedCallback;
};

export default useDebouncedFilters;
