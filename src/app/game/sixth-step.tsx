"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";

const texts = ["MOKYKLOJE MAN GERIAUSIAI SEKASI SUDĖTIS"];

export const SixthStep = ({ cb }: { cb: () => void }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <CoolText
        texts={texts}
        capitalize={true}
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && (
        <Form answer="3" onSuccess={cb} error="DVEJETUKININKAS!" />
      )}
    </>
  );
};
