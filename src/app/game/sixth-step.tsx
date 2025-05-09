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
        color="green"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && (
        <Form
          answer="KASGERIATASDEGA!"
          onSuccess={cb}
          error="NU JAU, AR TIKRAI??"
        />
      )}
    </>
  );
};
