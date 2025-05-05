"use client";
import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  scanWidth?: number;
  scanColor?: string;
  scanFps?: number;
  scanZIndex?: number;
  movingLine?: boolean;
  movingLineOpacity?: number;
  movingLineDuration?: string;
};

export default function AdvancedScanlines({
  children,
  scanWidth = 2,
  scanColor = "rgba(0, 0, 0, 0.3)",
  scanFps = 60,
  scanZIndex = 2147483648,
  movingLine = true,
  movingLineOpacity = 0.75,
  movingLineDuration = "6s",
}: Props) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return (
    <div className="relative">
      {/* The content you want to apply the scanline effect to */}
      <div className="scanlines relative overflow-hidden">{children}</div>

      <style jsx global>{`
        .scanlines:before,
        .scanlines:after {
          display: block;
          pointer-events: none;
          content: "";
          position: absolute;
        }

        /* Moving scanline effect */
        .scanlines:before {
          width: 100%;
          height: ${scanWidth}px;
          z-index: ${scanZIndex + 1};
          background: ${scanColor};
          opacity: ${movingLineOpacity};
          animation: ${movingLine
            ? `scanline ${movingLineDuration} linear infinite`
            : "none"};
        }

        /* Static scanlines effect */
        .scanlines:after {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: ${scanZIndex};
          background: linear-gradient(
            to bottom,
            transparent 50%,
            ${scanColor} 51%
          );
          background-size: 100% ${scanWidth * 2}px;
          animation: scanlines 1s steps(${scanFps}) infinite;
        }

        @keyframes scanline {
          0% {
            transform: translate3d(0, 200000%, 0);
          }
        }

        @keyframes scanlines {
          0% {
            background-position: 0 50%;
          }
        }
      `}</style>
    </div>
  );
}
