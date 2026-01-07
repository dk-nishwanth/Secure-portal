import { useEffect, useState } from 'react';

// Simple component to test responsive behavior
export function ResponsiveTest() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    scaleFactor: 1,
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleFactor = Math.min(width / 1920, 1);
      
      setScreenInfo({ width, height, scaleFactor });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-[#1a1a2e]/90 backdrop-blur-xl rounded-lg p-3 text-white text-xs border border-white/10 z-50">
      <div>Screen: {screenInfo.width}x{screenInfo.height}</div>
      <div>Scale: {(screenInfo.scaleFactor * 100).toFixed(1)}%</div>
      <div>Design: 1920x1080 (17" reference)</div>
    </div>
  );
}