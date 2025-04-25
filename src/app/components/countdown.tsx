"use client"
import { useState, useEffect } from 'react';
import { CoolText } from './cool-text';
import RetroLoader from './loader';

const padWithZero = (num: number): string => num < 10 ? `0${num}` : num.toString()
const texts = ['LAURYNAI, ŽAIDIMAS NETRUKUS PRASIDĖS.', 'GEGUŽĖS 9D. 18:00 BŪK PASIRUOŠĘS.'];

export const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isMounted, setIsMounted] = useState(false)

  const [glitchActive, setGlitchActive] = useState(-1);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      return {
        days: Math.floor(difference/(1000*60*60*24)),
        hours: Math.floor((difference/(1000*60*60))%24),
        minutes: Math.floor((difference/(1000*60))%60),
        seconds: Math.floor((difference/1000)%60)
      }
    }

    setTimeLeft(calculateTimeLeft)

    setTimeout(() => {
      setIsMounted(true)
    }, 2500)

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(Math.floor(Math.random() * 10) - 1);
      setTimeout(() => setGlitchActive(-1), 200);
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  if (!isMounted) return <RetroLoader />;

  const getGlitchStyle = (index: number) => {
    // Only apply effects when glitch is active and this element is affected
    if (glitchActive === -1) return {};
    
    // Each number triggers a different effect
    switch (glitchActive) {
      case 0: // Horizontal shift
        return index === 0 ? { transform: 'translateX(3px)' } : {textShadow: '2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)',};
      case 1: // Visibility flicker
        return index === 1 ? { opacity: 0 } : {textShadow: '2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)',};
      case 2: // Color distortion
        return index === 2 ? { color: '#00ff00', textShadow: '0 0 12px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.6)' } : { filter: 'blur(1px)' };
      case 3: // Vertical shift
        return index === 0 ? { transform: 'translateY(-2px)', filter: 'blur(1px)' } : { filter: 'blur(1px)' };
      case 4: // Skew effect
        return { transform: 'skewX(15deg)' };
      case 5: // RGB split effect
        return { 
          textShadow: '2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6)',
          transform: 'skewX(15deg)'
        };
      case 6: // Rotation
        return index === 3 ? { transform: 'rotate(5deg)' } : { transform: 'skewX(-4deg)' };
      case 7: // Scale distortion
        return index === 2 ? { transform: 'scaleY(1.2)' } : { transform: 'translateY(-2px)' };
      case 8: // Blur effect
        return { filter: 'blur(1px)' };
      default:
        return {};
    }
  };

  const corruptCharacter = () => {
    return Math.floor(Math.random() * 10) + 48; // Random digit
  };

  return (
    <>
      <div className={`bg-gray-950 p-2 lg:p-6 rounded-lg border-4 ${glitchActive > 5 ? 'border-red-600 border-dashed -skew-x-9' : 'border-gray-800'} mb-4 relative`}>
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
                `}
                style={{
                  textShadow: "0 0 12px rgba(92, 16, 16, 0.8), 0 0 20px rgba(255, 0, 0, 0.6)",
                  ...getGlitchStyle(index)
                }}
              >
                {glitchActive === index ? padWithZero(corruptCharacter()) : padWithZero(val)}{measure === 'minutes' ? 'min' : measure[0]}
              </span>
            </div>
          ))}
        </div>
        {(
          <div 
            className="absolute w-full h-0.5 bg-cyan-400 opacity-15 z-10" 
            style={{ 
              top: `${Math.random() * 100}%`,
              left: 0,
              animation: 'scanline 200 linear infinite' 
            }}
          ></div>
          )}
      </div>
      <CoolText texts={texts} />

      <style jsx>{`
  @keyframes monitorTurnOn {
    0% {
      opacity: 0;
      transform: scaleY(0.1) scaleX(1.2);
    }
    20% {
      opacity: 1;
      transform: scaleY(1) scaleX(1);
    }
    40% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    65% {
      opacity: 1;
    }
    80% { 
      textShadow: 2px 0 0 rgba(255,0,0,0.7), -2px 0 0 rgba(0,255,255,0.7), 0 0 20px rgba(255,0,0,0.6),
      transform: skewX(10deg)
    }
    85% {
      textShadow: 0 0 12px rgba(92, 16, 16, 0.8), 0 0 20px rgba(255, 0, 0, 0.6),
      transform: skewX(0)
    }
    95% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-monitorTurnOn {
    animation: monitorTurnOn 0.6s ease-out forwards;
  }
`}</style>
    </>
  );
}