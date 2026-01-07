import { useEffect } from 'react';
import { initResponsive, preventZoom, setViewportMeta } from '../utils/responsive';

// Hook to initialize responsive behavior
export const useResponsiveInit = () => {
  useEffect(() => {
    // Set viewport meta tag for consistent behavior
    setViewportMeta();
    
    // Prevent zoom on touch devices
    preventZoom();
    
    // Initialize responsive scaling
    const cleanup = initResponsive();
    
    // Cleanup on unmount
    return cleanup;
  }, []);
};