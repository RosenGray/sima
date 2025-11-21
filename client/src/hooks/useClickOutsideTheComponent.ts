import { useEffect, RefObject } from 'react';

/**
 * Hook that triggers a callback when user clicks outside the referenced element
 * @param ref - React ref object attached to the component
 * @param callback - Function to execute when clicking outside
 */
export const useClickOutsideTheComponent = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};