'use client';
import { useState, useEffect } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

// Default dimensions for SSR - using common desktop viewport
const DEFAULT_DIMENSIONS = {
  width: 1920,
  height: 1080,
};

export const useDimensions = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);

  useEffect(() => {
    // Set initial dimensions based on actual window size
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
};
