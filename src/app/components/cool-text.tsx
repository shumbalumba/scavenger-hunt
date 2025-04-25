"use client"
import { useEffect, useState, memo } from "react";

export const CoolText = memo(function Cool({ texts }: { texts: string[] }) {
  const [displayText, setDisplayText] = useState<string[]>(['']);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let arrIndex = 0;
    // Delay the start of text animation by 800ms after component mount
    const initialDelay = setTimeout(() => {
      console.log(texts)

      const textInterval = setInterval(() => {
        if (currentIndex <= texts[arrIndex].length) {
          setDisplayText(prev => {
            const copy = [...prev];
            copy[arrIndex] = texts[arrIndex].slice(0, currentIndex)
            return copy
        });
          currentIndex++;
        } else {
          currentIndex = 0;
          arrIndex++;
        }

        if (arrIndex >= texts.length) {
          clearInterval(textInterval);
          setAnimationComplete(true);
        }
      }, 60); // Speed of typing animation
      
      return () => clearInterval(textInterval);
    }, 1200);
    
    return () => clearTimeout(initialDelay);
  }, [texts]);

  return (
    <div className="h-16 flex items-center justify-center mb-4 flex-col">
    {displayText.map((text, i) => <p 
      key={text}
      className={`
        text-yellow-400 
        text-center
        text-2xl
        lg:text-4xl 
        font-bold 
        tracking-wider
        ${animationComplete ? 'animate-pulse' : ''}
      `}
      style={{
        textShadow: "0 0 8px rgba(255, 215, 0, 0.7), 0 0 12px rgba(255, 215, 0, 0.5)"
      }}
    >
      {text}
      {i === displayText.length - 1 && 
        <span className={`${animationComplete ? 'invisible' : 'inline-block'} w-2 h-6 bg-yellow-400 ml-1 animate-pulse`}></span>
      }
    </p>)}
  </div>
  )
})