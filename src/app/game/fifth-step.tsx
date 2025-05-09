"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";

const texts = ["Jūsų siunta paštomate"];

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
        <Form answer="RAJONAS" onSuccess={cb} error="NU JAU, AR TIKRAI??" />
      )}
    </>
  );
};
