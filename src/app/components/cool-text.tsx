"use client";
import { playTypingSound } from "@/utils/playSound";
import { useEffect, useState, memo, useRef } from "react";

const colorVariants = {
  yellow: {
    main: "text-yellow-400",
    shadows:
      "0 0 8px rgba(187, 177, 118, 0.7), 0 0 12px rgba(255, 215, 0, 0.5)",
  },
  green: {
    main: "text-green-400",
    shadows: "0 0 8px rgba(74, 222, 128, 0.7), 0 0 12px rgba(22, 163, 74, 0.5)",
  },
  blue: {
    main: "text-blue-400",
    shadows: "0 0 8px rgba(96, 165, 250, 0.7), 0 0 12px rgba(37, 99, 235, 0.5)",
  },
  purple: {
    main: "text-purple-400",
    shadows:
      "0 0 8px rgba(192, 132, 252, 0.7), 0 0 12px rgba(126, 34, 206, 0.5)",
  },
  teal: {
    main: "text-teal-400",
    shadows:
      "0 0 8px rgba(45, 212, 191, 0.7), 0 0 12px rgba(20, 184, 166, 0.5)",
  },
  red: {
    main: "text-red-400",
    shadows:
      "0 0 8px rgba(248, 113, 113, 0.7), 0 0 12px rgba(220, 38, 38, 0.5)",
  },
  orange: {
    main: "text-orange-400",
    shadows: "0 0 8px rgba(251, 146, 60, 0.7), 0 0 12px rgba(234, 88, 12, 0.5)",
  },
  pink: {
    main: "text-pink-400",
    shadows:
      "0 0 8px rgba(244, 114, 182, 0.7), 0 0 12px rgba(219, 39, 119, 0.5)",
  },
  cyan: {
    main: "text-cyan-400",
    shadows: "0 0 8px rgba(34, 211, 238, 0.7), 0 0 12px rgba(8, 145, 178, 0.5)",
  },
  white: {
    main: "text-gray-100",
    shadows:
      "0 0 8px rgba(229, 231, 235, 0.7), 0 0 12px rgba(209, 213, 219, 0.5)",
  },
};

export const CoolText = memo(function Cool({
  texts,
  color = "yellow",
  capitalize,
  onComplete,
}: {
  texts: string[];
  color?: keyof typeof colorVariants;
  capitalize?: boolean;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState<string[]>([""]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    let arrIndex = 0;
    // Delay the start of text animation by 800ms after component mount
    const initialDelay = setTimeout(() => {
      const textInterval = setInterval(() => {
        if (currentIndex <= texts[arrIndex].length) {
          if (currentIndex > 0) {
            // Don't play sound for first empty character
            playTypingSound(audioContextRef);
          }

          setDisplayText((prev) => {
            const copy = [...prev];
            copy[arrIndex] = texts[arrIndex].slice(0, currentIndex);
            return copy;
          });
          currentIndex++;
        } else {
          currentIndex = 0;
          arrIndex++;
        }

        if (arrIndex >= texts.length) {
          clearInterval(textInterval);
          setAnimationComplete(true);
          onComplete?.();
        }
      }, 60); // Speed of typing animation

      return () => clearInterval(textInterval);
    }, 1200);

    return () => clearTimeout(initialDelay);
  }, [texts]);

  return (
    <div className="flex items-center justify-center mb-4 flex-col w-full">
      {displayText.map((text, i) => (
        <p
          key={text}
          className={`
          ${colorVariants[color].main} 
          ${text.startsWith("• ") ? "text-left w-full text-xl lg:text-2xl" : "text-center w-auto text-2xl lg:text-4xl"}
          font-bold 
          tracking-wider
          select-none
          ${capitalize ? "uppercase" : ""} 
          ${animationComplete ? "animate-pulse" : ""}
        `}
          style={{
            textShadow: colorVariants[color].shadows,
          }}
        >
          {text}
          {i === displayText.length - 1 && (
            <span
              className={`${animationComplete ? "invisible" : "inline-block"} w-2 h-6 ${color} ml-1 animate-pulse`}
            ></span>
          )}
        </p>
      ))}
    </div>
  );
});

// Fix TypeScript issues by adding declaration
declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}
