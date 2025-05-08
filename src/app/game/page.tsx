"use client";

import { useLocalStorage } from "usehooks-ts";
import { FirstStep } from "./first-step";
import { useEffect } from "react";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourtStep } from "./fourth-step";
import { Button } from "@/components/ui/button";

const storageKey = "gameStep";

export default function Game() {
  const [currentStep, setValue] = useLocalStorage(storageKey, 0, {
    initializeWithValue: false,
  });

  const env = process.env.NODE_ENV;

  const handleRestart = () => {
    setValue(0);
  };

  useEffect(() => {
    setValue(0);
  }, []);

  const handleNext = () => {
    setValue((c) => c + 1);
  };

  if (env === "production") {
    return null;
  }

  const renderGameStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep cb={handleNext} />;
      case 1:
        return <SecondStep cb={handleNext} />;
      case 2:
        return <ThirdStep />;
      case 3:
        return <FourtStep />;
      default:
        return <FirstStep cb={() => setValue(1)} />;
    }
  };

  return (
    <>
      {renderGameStep()}
      <Button
        onClick={handleRestart}
        variant="ghost"
        className="absolute bottom-3 right-3"
      >
        RESTART
      </Button>
    </>
  );
}
