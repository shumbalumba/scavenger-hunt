import * as React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RetroCameraButtonProps {
  onCapture?: (file: File) => void;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  label?: string;
}

export function RetroCameraButton({
  onCapture,
  className,
  variant = "outline",
  label = "CAPTURE EVIDENCE",
}: RetroCameraButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
    setIsActive(true);
    setTimeout(() => setIsActive(false), 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onCapture) {
      onCapture(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        variant={variant}
        className={cn("relative group", isActive && "animate-pulse", className)}
        onClick={handleClick}
      >
        <div className="absolute -inset-0.5 bg-teal-500/20 opacity-0 group-hover:opacity-100 rounded-md blur transition-all duration-300"></div>
        <Camera className="mr-2 size-5" />
        {label}
      </Button>

      <div className="flex items-center justify-center w-full">
        <div className="h-1 w-1 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(45,212,191,0.7)] animate-pulse"></div>
        <div className="h-px w-10 bg-teal-500/30"></div>
        <div className="h-1 w-1 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(45,212,191,0.7)] animate-pulse delay-75"></div>
        <div className="h-px w-10 bg-teal-500/30"></div>
        <div className="h-1 w-1 rounded-full bg-teal-500 shadow-[0_0_5px_rgba(45,212,191,0.7)] animate-pulse delay-150"></div>
      </div>
    </div>
  );
}

// Alternative version - a simpler file upload that accepts camera photos
export function RetroFileUpload({
  onCapture,
  className,
  variant = "secondary",
}: {
  onCapture?: (file: File) => void;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  accept?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onCapture) {
      onCapture(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        capture="user"
        accept="image/*"
      />

      <Button
        variant={variant}
        className={cn("relative", className)}
        onClick={handleClick}
      >
        <Upload className="mr-2 size-5" />
        SELFIE
      </Button>
    </div>
  );
}
