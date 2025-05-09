"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";

const texts = [
  "OMNIVA:",
  "Siunta CF098800731EE jau Vilniaus NORFA Zvalgu pastomatas. Kodas: 734899. Saugosime iki 2025.05.16.",
];

export const FifthStep = ({ cb }: { cb: () => void }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <CoolText
        texts={texts}
        capitalize={true}
        color="green"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && (
        <Form
          answer="RAJONAS"
          onSuccess={cb}
          error="NU JAU, AR TIKRAI??"
          inputClassName="text-green-400 border-green-500/70 focus:border-green-400 shadow-[green-700]"
          btnClassName="text-green-400 border-green-500/70 focus:border-green-400 shadow-[green-700]"
        />
      )}
    </>
  );
};
