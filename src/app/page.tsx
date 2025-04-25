import { Countdown } from "./components/countdown";
import AdvancedScanlines from "./components/scanlines";

export default function Home() {
  return (
    <AdvancedScanlines>
      <div className="grid grid-rows-[20px_1fr_20px] items-start lg:items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-start lg:items-center justify-items-center sm:items-start align-middle container">
          <Countdown targetDate={new Date('2025-05-09 18:00')} />
          {/* Paklausykim naujos muzikos!
          <audio controls src="/daina.mp3"></audio>
          <FirstQuestion />

          <ImageUpload /> */}

       </main>
     </div>
    </AdvancedScanlines>
  );
}
