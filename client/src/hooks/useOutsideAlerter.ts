import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideElement(htmlElement: HTMLElement | null,cb:() => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (htmlElement && !htmlElement.contains(event.target as HTMLElement)) {
        cb();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [htmlElement]);
}
