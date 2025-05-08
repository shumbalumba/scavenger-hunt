import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RetroAudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  note?: string;
}

export function RetroAudioPlayer({
  src,
  autoPlay = false,
  loop = false,
  note = "SUMMER_HIT_2025.MP3",
  className,
}: RetroAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    if (isPlaying) {
      audio.play();
    }
  };

  return (
    <div
      className={cn("flex flex-col space-y-2 animate-monitorTurnOn", className)}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        className="hidden"
      />

      <div className="flex items-center space-x-2 justify-center">
        <Button
          variant="secondary"
          size="icon"
          onClick={togglePlay}
          className="bg-gray-800 border-cyan-500 text-cyan-400 hover:border-cyan-400 shadow-[0_0_10px_rgba(34, 211, 238, 0.7)] hover:shadow-[0_0_15px_rgba(8, 145, 178, 0.5)] hover:text-cyan-300"
        >
          {isPlaying ? <Pause size={48} /> : <Play size={48} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleReplay}
          className="bg-gray-800/50 border-gray-700"
        >
          {<RotateCcw size={48} />}
        </Button>

        {/* <div className="relative flex-grow h-2 bg-gray-800 rounded overflow-hidden border border-purple-500/50">
          <div
            className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-100 shadow-[0_0_10px_rgba(192,132,252,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div> */}
      </div>

      <div className="text-cyan-400 text- font-mono opacity-70 tracking-wider text-center">
        {note}
      </div>
    </div>
  );
}
