"use client"
import { Button } from "@/components/ui/button";
import { Countdown } from "./components/countdown";
import AdvancedScanlines from "./components/scanlines";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  }, [])

  return (
    <AdvancedScanlines>
      <main className="flex flex-col justify-start items-center lg:items-center justify-items-center min-h-screen p-8 pt-12 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          {hasEntered ? <Countdown targetDate={new Date('2025-05-09 18:00')} /> : <Button className="mt-auto mb-auto" size="xl" onClick={() => setHasEntered(true)} variant="default">ENTER</Button>}
     </main>
    </AdvancedScanlines>
  );
}
