"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const texts = ["WARNING!", "PROCEED WITH CAUTION!"];

export const Intro = ({
  cb,
  progress,
  onResume,
}: {
  cb: () => void;
  progress: number;
  onResume: () => void;
}) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <TriangleAlert />
      <CoolText
        texts={texts}
        capitalize={true}
        color="red"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && (
        <Form
          answer="DEVIL"
          onSuccess={cb}
          error="ERROR!"
          btnText="START NEW GAME"
          inputClassName="text-red-400 border-red-500/70 focus:border-red-400"
          btnClassName="text-red-400 border-red-500/70 focus:border-red-400"
        />
      )}
      {progress && <Button onClick={onResume}>RESUME</Button>}
    </>
  );
};
