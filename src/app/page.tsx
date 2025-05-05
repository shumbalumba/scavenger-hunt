"use client";
import { Button } from "@/components/ui/button";
import { Countdown } from "./components/countdown";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }, []);

  return hasEntered ? (
    <Countdown targetDate={new Date("2025-05-09 18:30")} />
  ) : (
    <Button
      className="mt-auto mb-auto"
      size="xl"
      onClick={() => setHasEntered(true)}
      variant="default"
    >
      ENTER
    </Button>
  );
}
