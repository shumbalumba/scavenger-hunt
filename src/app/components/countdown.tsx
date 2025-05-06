"use client";
import { useState, useEffect, useRef } from "react";
import { CoolText } from "./cool-text";
import RetroLoader from "./loader";
import { playTypingSound } from "@/utils/playSound";

const padWithZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();
const texts = [
  "LAURYNAI, ŽAIDIMAS NETRUKUS PRASIDĖS.",
  "GEGUŽĖS 9D. 18:30 BŪK PASIRUOŠĘS.",
  "STARTO VIETA NAMIE.",
  "TAU REIKĖS:",
  " ",
  "• Aprangos į gamtą ir į šventę atitinkančios oro sąlygas ",
  "• Bolt paspirtukas ar panaši transporto priemonė. Svarbu turėti prieigą prasidėjus žaidimui. Automobilis netinka.",
  "• Pakrautas telefonas",
  "• Popierius ir tušinukas",
  "• Alaus virimo proceso aprašas spausdintas ant lapo",
  "• Mėgstamas užkandis prie alaus",
  "• Rulonas šikpopierio",
  "• 5 - 8 prezervatyvai",
];

export const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(-1);
  const [counter, setCounter] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Ref to store timeout IDs for cleanup
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to calculate random delay for next glitch
  // Returns a time in milliseconds
  const getRandomGlitchDelay = () => {
    // Possible delay ranges in milliseconds
    const possibleDelays = [
      { min: 400, max: 700, weight: 0.1 }, // Very quick (0.5-0.8s)
      { min: 1000, max: 1500, weight: 0.2 }, // Quick (1-2s)
      { min: 2000, max: 3000, weight: 0.4 }, // Medium (2-4s)
      { min: 3000, max: 4000, weight: 0.3 }, // Long (4-7s)
    ];

    // Choose a delay range based on weights
    const randomValue = Math.random();
    let cumulativeWeight = 0;
    let selectedRange;

    for (const range of possibleDelays) {
      cumulativeWeight += range.weight;
      if (randomValue <= cumulativeWeight) {
        selectedRange = range;
        break;
      }
    }

    // If no range was selected (should not happen with proper weights), use medium range
    const { min, max } = selectedRange || possibleDelays[2];

    // Generate a random value within the selected range
    return Math.floor(min + Math.random() * (max - min));
  };

  // Function to generate random glitch duration (how long the glitch lasts)
  const getRandomGlitchDuration = () => {
    // Mostly short glitches, occasionally longer ones
    const baseTime = 100 + Math.random() * 100;

    // 10% chance of longer glitch
    if (Math.random() < 0.1) {
      return baseTime + 200 + Math.random() * 300;
    }

    return baseTime;
  };

  // Function to schedule next glitch
  const scheduleNextGlitch = () => {
    // Clear any existing timeout
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }

    // Calculate delay until next glitch
    const nextGlitchDelay = getRandomGlitchDelay();

    // Schedule the next glitch
    glitchTimeoutRef.current = setTimeout(() => {
      // Determine type of glitch
      const glitchType = Math.floor(Math.random() * 10) - 1;
      setGlitchActive(glitchType);

      // Calculate how long this glitch should last
      const glitchDuration = getRandomGlitchDuration();

      // Schedule the end of this glitch
      setTimeout(() => {
        setGlitchActive(-1);

        // Schedule the next glitch after this one ends
        scheduleNextGlitch();
      }, glitchDuration);
    }, nextGlitchDelay);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft);

    setTimeout(() => {
      setIsMounted(true);
    }, 2500);

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Start the glitch scheduling when component is mounted
  useEffect(() => {
    if (isMounted) {
      // Initial delay before starting glitches
      const initialDelay = setTimeout(() => {
        scheduleNextGlitch();
      }, 1000);

      return () => {
        clearTimeout(initialDelay);
        if (glitchTimeoutRef.current) {
          clearTimeout(glitchTimeoutRef.current);
        }
      };
    }
  }, [isMounted]);

  if (!isMounted) return <RetroLoader />;

  const getGlitchStyle = (index: number) => {
    // Only apply effects when glitch is active and this element is affected
    if (glitchActive === -1) return {};

    // Each number triggers a different effect
    switch (glitchActive) {
      case 0: // Horizontal shift
        return index === 0
          ? { transform: "translateX(3px)" }
          : {
              textShadow:
                "2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)",
            };
      case 1: // Visibility flicker
        return index === 1
          ? { opacity: 0 }
          : {
              textShadow:
                "2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)",
            };
      case 2: // Color distortion
        return index === 2
          ? {
              color: "#00ff00",
              textShadow:
                "0 0 12px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.6)",
            }
          : { filter: "blur(1px)" };
      case 3: // Vertical shift
        return index === 0
          ? { transform: "translateY(-2px)", filter: "blur(1px)" }
          : { filter: "blur(1px)" };
      case 4: // Skew effect
        return { transform: "skewX(15deg)" };
      case 5: // RGB split effect
        return {
          textShadow:
            "2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)",
          transform: "skewX(15deg)",
        };
      case 6: // Rotation
        return index === 3
          ? { transform: "rotate(5deg)" }
          : { transform: "skewX(-4deg)" };
      case 7: // Scale distortion
        return index === 2
          ? { transform: "scaleY(1.2)" }
          : { transform: "translateY(-2px)" };
      case 8: // Blur effect
        return { filter: "blur(1px)" };
      default:
        return {};
    }
  };

  const corruptCharacter = () => {
    return Math.floor(Math.random() * 10) + 48; // Random digit
  };

  // Add possibility of multiple simultaneous glitches
  const getMultiGlitchStyle = (index: number) => {
    // 15% chance of more severe multi-glitch effect during active glitch
    if (glitchActive >= 0 && Math.random() < 0.15) {
      // Combine two random glitch effects for more chaotic appearance
      const secondaryGlitch = Math.floor(Math.random() * 9);
      const primaryStyle = getGlitchStyle(index);
      const secondaryStyle = (() => {
        switch (secondaryGlitch) {
          case 0:
            return { transform: "translateX(-2px)" };
          case 1:
            return { opacity: 0.7 };
          case 2:
            return { filter: "hue-rotate(90deg)" };
          case 3:
            return { transform: "translateY(3px)" };
          case 4:
            return { transform: "skewX(-10deg)" };
          case 5:
            return { filter: "contrast(1.2)" };
          case 6:
            return { transform: "rotate(-3deg)" };
          case 7:
            return { transform: "scaleX(1.1)" };
          case 8:
            return { filter: "brightness(1.3)" };
          default:
            return {};
        }
      })();

      return { ...primaryStyle, ...secondaryStyle };
    }

    return getGlitchStyle(index);
  };

  const handleClick = () => {
    playTypingSound(audioContextRef, "square");
    if (counter >= 4) {
      location.assign("https://www.youtube.com/watch?v=oavMtUWDBTM");
    }
    setCounter((count) => count + 1);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`bg-gray-950 p-2 lg:p-6 rounded-lg border-4 ${glitchActive > 5 ? "border-red-600 border-dashed -skew-x-9" : "border-gray-800"} mb-4 relative`}
      >
        <div className="flex animate-monitorTurnOn">
          {Object.entries(timeLeft).map(([measure, val], index) => (
            <div
              key={measure}
              className={`
                h-40 
                flex 
                items-center 
                justify-center 
                mx-1
              `}
            >
              <span
                className={`
                  text-4xl
                  lg:text-6xl 
                  font-mono 
                  font-bold 
                  text-red-600
                  tracking-wider
                  filter drop-shadow-lg
                  shadow-lg
                  ml-1
                  select-none
                `}
                style={{
                  textShadow:
                    "0 0 12px rgba(92, 16, 16, 0.8), 0 0 20px rgba(255, 0, 0, 0.6)",
                  ...getMultiGlitchStyle(index),
                }}
              >
                {glitchActive === index
                  ? padWithZero(corruptCharacter())
                  : padWithZero(val)}
                {measure === "minutes" ? "min" : measure[0]}
              </span>
            </div>
          ))}
        </div>
        {
          <div
            className="absolute w-full h-0.5 bg-cyan-400 opacity-15 z-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              animation: "scanline 200 linear infinite",
            }}
          ></div>
        }
      </div>
      <CoolText texts={texts} withJoke={true} />
    </>
  );
};
