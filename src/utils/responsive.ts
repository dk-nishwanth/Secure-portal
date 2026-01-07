// Responsive utility functions for consistent layout across all screen sizes

export const DESIGN_WIDTH = 1920; // Base design width (17" laptop reference)
export const DESIGN_HEIGHT = 1080; // Base design height

// Calculate scale factor for current viewport
export const getScaleFactor = (): number => {
  if (typeof window === 'undefined') return 1;
  
  const viewportWidth = window.innerWidth;
  const scaleFactor = Math.min(viewportWidth / DESIGN_WIDTH, 1);
  
  return scaleFactor;
};

// Apply consistent scaling to elements
export const applyResponsiveScale = (element: HTMLElement): void => {
  if (!element) return;
  
  const scaleFactor = getScaleFactor();
  
  if (scaleFactor < 1) {
    element.style.transform = `scale(${scaleFactor})`;
    element.style.transformOrigin = 'top left';
  } else {
    element.style.transform = '';
    element.style.transformOrigin = '';
  }
};

// Get responsive font size
export const getResponsiveFontSize = (baseFontSize: number): string => {
  const scaleFactor = getScaleFactor();
  return `${baseFontSize * Math.max(scaleFactor, 0.8)}px`;
};

// Get responsive spacing
export const getResponsiveSpacing = (baseSpacing: number): string => {
  const scaleFactor = getScaleFactor();
  return `${baseSpacing * Math.max(scaleFactor, 0.8)}px`;
};

// Responsive breakpoints based on common laptop sizes
export const BREAKPOINTS = {
  // 17" laptops (1920px and above)
  xl: 1920,
  // 15" laptops (1366px - 1919px)
  lg: 1366,
  // 13" laptops (1280px - 1365px)
  md: 1280,
  // Small laptops (1024px - 1279px)
  sm: 1024,
  // Very small screens (below 1024px)
  xs: 0
};

// Get current breakpoint
export const getCurrentBreakpoint = (): keyof typeof BREAKPOINTS => {
  if (typeof window === 'undefined') return 'xl';
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

// Responsive class names based on breakpoint
export const getResponsiveClasses = (baseClasses: string): string => {
  const breakpoint = getCurrentBreakpoint();
  
  // Add breakpoint-specific classes if needed
  const responsiveClasses = {
    xl: baseClasses,
    lg: `${baseClasses} scale-90`,
    md: `${baseClasses} scale-85`,
    sm: `${baseClasses} scale-80`,
    xs: `${baseClasses} scale-75`
  };
  
  return responsiveClasses[breakpoint] || baseClasses;
};

// Initialize responsive behavior
export const initResponsive = (): void => {
  if (typeof window === 'undefined') return;
  
  const updateScale = () => {
    const appContainer = document.querySelector('.app-container') as HTMLElement;
    if (appContainer) {
      applyResponsiveScale(appContainer);
    }
  };
  
  // Update on resize
  window.addEventListener('resize', updateScale);
  
  // Initial update
  updateScale();
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', updateScale);
  };
};

// Prevent zoom on mobile devices
export const preventZoom = (): void => {
  if (typeof document === 'undefined') return;
  
  // Prevent pinch zoom
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });
  
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

// Ensure consistent viewport behavior
export const setViewportMeta = (): void => {
  if (typeof document === 'undefined') return;
  
  let viewport = document.querySelector('meta[name=viewport]') as HTMLMetaElement;
  
  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.head.appendChild(viewport);
  }
  
  // Set fixed viewport to prevent scaling issues
  viewport.content = `width=${DESIGN_WIDTH}, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no`;
};

// CSS-in-JS responsive styles
export const responsiveStyles = {
  container: {
    width: `${DESIGN_WIDTH}px`,
    minHeight: '100vh',
    margin: '0 auto',
    transformOrigin: 'top left',
  },
  
  sidebar: {
    position: 'fixed' as const,
    left: '1.5rem',
    top: '6rem',
    zIndex: 40,
  },
  
  mainContent: {
    marginLeft: '7rem',
    padding: '1.5rem',
  },
  
  tooltip: {
    position: 'relative' as const,
    zIndex: 50,
  }
};

// Hook for responsive behavior in React components
export const useResponsive = () => {
  const scaleFactor = getScaleFactor();
  const breakpoint = getCurrentBreakpoint();
  
  return {
    scaleFactor,
    breakpoint,
    isSmallScreen: breakpoint === 'sm' || breakpoint === 'xs',
    isMediumScreen: breakpoint === 'md',
    isLargeScreen: breakpoint === 'lg' || breakpoint === 'xl',
    getResponsiveValue: (value: number) => value * Math.max(scaleFactor, 0.8),
    getResponsiveClasses,
  };
};