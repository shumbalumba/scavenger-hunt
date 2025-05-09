"use client";

import { useLocalStorage } from "usehooks-ts";
import { FirstStep } from "./first-step";
import { useEffect } from "react";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourtStep } from "./fourth-step";
import { SosButton } from "../components/sos-button";

const storageKey = "gameStep";

export function Game({ songs }: { songs?: string | string[] }) {
  const [currentStep, setValue] = useLocalStorage(storageKey, 0, {
    initializeWithValue: false,
  });
  const [maxStep, setMaxStep] = useLocalStorage("maxStep", 0, {
    initializeWithValue: false,
  });

  useEffect(() => {
    if (songs !== undefined) {
      setValue(3);
      return;
    }
    setValue(0);
  }, []);

  useEffect(() => {
    if (currentStep > maxStep) {
      setMaxStep(currentStep);
    }
  }, [currentStep]);

  const handleNext = () => {
    setValue((c) => c + 1);
  };

  const renderGameStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep cb={handleNext} />;
      case 1:
        return <SecondStep cb={handleNext} />;
      case 2:
        return <ThirdStep />;
      case 3:
        return <FourtStep onHint={currentStep < maxStep} />;
      default:
        return <FirstStep cb={() => setValue(1)} />;
    }
  };

  return (
    <>
      {renderGameStep()}

      <SosButton />
    </>
  );
}
