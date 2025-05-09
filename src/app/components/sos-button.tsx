"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CoolText } from "./cool-text";

export const SosButton = ({
  text,
  hint,
}: {
  text?: string;
  hint?: React.ReactNode;
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  if (showHint) {
    return (
      <div className="absolute inset-0 bg-red-600 flex flex-col justify-evenly p-6">
        {text && <CoolText texts={["UZUOMINA VA TOKIA"]} />}
        {hint}
        <Button
          onClick={() => {
            setShowHint(false);
          }}
        >
          CLOSE
        </Button>
      </div>
    );
  }

  if (showWarning) {
    return (
      <div className="absolute inset-0 bg-red-600 flex flex-col justify-evenly p-6">
        <CoolText texts={["AR TIKRAI NORI PAMATYTI UZUOMINA?"]} />
        <div className="flex justify-between p-2">
          <Button onClick={() => setShowWarning(false)}>BACK</Button>
          <Button
            onClick={() => {
              setShowHint(true);
              setShowWarning(false);
            }}
          >
            UZUOMINA
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-3 right-3">
      <Button variant="ghost" onClick={() => setShowWarning(true)}>
        SOS
      </Button>
    </div>
  );
};
