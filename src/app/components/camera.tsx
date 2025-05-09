import * as React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upload } from "@vercel/blob/client";
import { CoolText } from "./cool-text";

interface RetroCameraButtonProps {
  onCapture?: (file: File) => void;
  className?: string;
  text?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  label?: string;
}

export function RetroFileUpload({
  className,
  text = "DĖMESIO, TAVO NUOTRAUKA BUS ĮVERTINTA!",
  label = "IKELTI IKALCIUS",
}: RetroCameraButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      console.log("Uploaded to:", newBlob.url);

      // onCapture?.(file); // or pass data.url if you want the blob URL
      setUploadComplete(true);
      console.log(uploadComplete);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  //liko:
  // QR,S5 - PASTOMATO ZINUTE, SOS TIMERIS (?), STEP 6 - UZUOMINA MAPO TASKA RASTI, S7 -> pabaiga, RESTART

  return (
    <div className="flex flex-col items-center space-y-2">
      <CoolText texts={[text]} color="teal" />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        variant="outline"
        className={cn("relative group", "animate-pulse", className)}
        onClick={handleClick}
      >
        <div className="absolute -inset-0.5 bg-teal-500/20 opacity-0 group-hover:opacity-100 rounded-md blur transition-all duration-300"></div>
        <Camera className="mr-2 size-5" />
        {uploading ? "UPLOADING..." : label}
      </Button>
    </div>
  );
}
