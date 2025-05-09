"use client";

import { useLocalStorage } from "usehooks-ts";
import { FirstStep } from "./first-step";
import { useEffect, useState } from "react";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourtStep } from "./fourth-step";
import { SosButton } from "../components/sos-button";
import { CoolText } from "../components/cool-text";
import { FifthStep } from "./fifth-step";
import { SixthStep } from "./sixth-step";
import { Intro } from "./intro";
import { SeventhStep } from "./seventh-step";
import RetroLoader from "../components/loader";

const storageKey = "gameStep";

export function Game({ songs }: { songs?: string | string[] }) {
  const [currentStep, setValue] = useLocalStorage<number | null>(
    storageKey,
    null
  );
  const [maxStep, setMaxStep] = useLocalStorage("maxStep", 0);
  const [blockGame, setBlockGame] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (songs !== undefined) {
      if (!currentStep) {
        setBlockGame(true);
        return;
      }
      setValue(3);
      return;
    }
  }, []);

  useEffect(() => {
    window?.scrollTo(0, 0);
    if (currentStep && currentStep > maxStep) {
      setMaxStep(currentStep);
    }
  }, [currentStep]);

  const handleNext = () => {
    setValue((c) => c! + 1);
  };

  const sosProps: Record<number, object> = {
    0: {
      text: "KA PASAKYTI BARMENUI? TIK GARSIAI! +AUTOMOBILIO NUMERIO SKAICIAI",
    },
    1: { text: "AR STIPRUS SIE GERIMAI?" },
    2: { text: "KUR VEDA SIOS KOORDINATES?" },
    3: { text: "KELK NUOTRAUKA TIKTAI " },
    4: { text: "NZN KO DAR NORI" },
    5: { hint: () => setValue(3) },
    6: { text: "(54.7176685, 25.2820945)" },
    7: {
      text: "KUR DAR GALIMA NETOLIESE ATSIGERT IVAIRAUS ALAUS IR PAVALGYT UZ BRANGIAI?",
    },
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
        return (
          <FourtStep
            onHint={currentStep < maxStep}
            cb={currentStep < maxStep ? () => setValue(maxStep) : handleNext}
          />
        );
      case 4:
        return <FifthStep cb={handleNext} />;
      case 5:
        return <SixthStep cb={handleNext} />;
      case 6:
        return <SeventhStep />;
      default:
        return (
          <Intro
            cb={() => setValue(0)}
            progress={maxStep}
            onResume={() => setValue(maxStep)}
          />
        );
    }
  };

  if (blockGame) {
    return <CoolText texts={["c===8"]} />;
  }

  return (
    <>
      {isMounted ? renderGameStep() : <RetroLoader />}

      {currentStep !== null && <SosButton {...sosProps[currentStep]} />}
    </>
  );
}
