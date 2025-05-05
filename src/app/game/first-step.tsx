"use client";

import { useState } from "react";
import { RetroAudioPlayer } from "../components/audio-player";
import { CoolText } from "../components/cool-text";

const texts = ["Laurynai,", "Beje, ar girdėjai naujausią šių metų hitą?"];

export const FirstStep = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <CoolText
        texts={texts}
        capitalize={true}
        color="pink"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && <RetroAudioPlayer src="daina.mp3" />}
    </>
  );
};
