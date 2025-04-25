'use client';
import { useEffect, useState } from 'react';

export default function RetroLoader({ 
  text = "LOADING", 
  duration = 2000,
  autoReset = false
}) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(newProgress);
      
      if (now < endTime) {
        requestAnimationFrame(updateProgress);
      } else if (autoReset) {
        // Reset and start over if autoReset is true
        setTimeout(() => {
          setProgress(0);
          requestAnimationFrame(updateProgress);
        }, 500); // Small pause before resetting
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [duration, autoReset]);

  return (
    <div className="w-72">
      {/* Progress text */}
      <div className="flex justify-between mb-1">
        <span className="text-yellow-400">{text}</span>
        <span className="text-yellow-400">{Math.round(progress)}%</span>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-gray-800 border border-yellow-600">
        {/* Progress bar fill */}
        <div 
          className="h-4 bg-yellow-400 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Scanline effect inside progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-70"></div>
        </div>
      </div>
    </div>
  );
}