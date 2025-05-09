"use client";

import { useState } from "react";
import { RetroAudioPlayer } from "../components/audio-player";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";

const texts = [
  "Laurynai, sveikas atvykęs į žaidimą. Tikimės, kad esi pasiruošęs šiek tiek pažaisti ir spręsti bei vykdyti mūsų sugalvotas užduotis. Kiekvienas tavo išbandymas nuves tave į tam tikrą tašką, kuriame radęs ar gavęs atsakymą turėsi jį įvesti šioje platformoje, kad pereitum prie kito išbandymo.",
  "Beje, ar girdėjai naujausią šių metų hitą?",
];

export const FirstStep = ({ cb }: { cb: () => void }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <CoolText
        texts={texts}
        capitalize={true}
        color="pink"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && <RetroAudioPlayer src="kas-geria-tas-dega.mp3" />}
      {showPlayer && (
        <Form
          answer="KASGERIATASDEGA!420"
          onSuccess={cb}
          error="NU JAU, AR TIKRAI??"
          inputClassName="text-pink-400 border-pink-500/70 focus:border-pink-400 shadow-[0_0_8px_pink-700]"
          btnClassName="text-pink-400 border-pink-500/70 focus:border-pink-400 shadow-[0_0_8px_pink-700]"
        />
      )}
    </>
  );
};
