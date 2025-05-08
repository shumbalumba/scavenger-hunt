"use client";

import { useLocalStorage } from "usehooks-ts";
import { FirstStep } from "./first-step";
import { useEffect, useState } from "react";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourtStep } from "./fourth-step";
import { Button } from "@/components/ui/button";
import { Form } from "../components/form";

const storageKey = "gameStep";

export default function Game() {
  const [currentStep, setValue] = useLocalStorage(storageKey, 0, {
    initializeWithValue: false,
  });
  const [pass, setPass] = useState(false);

  const handleRestart = () => {
    setValue(0);
  };

  useEffect(() => {
    setValue(0);
  }, []);

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
        return <FourtStep />;
      default:
        return <FirstStep cb={() => setValue(1)} />;
    }
  };

  if (!pass) {
    return (
      <Form
        answer="VAKARAS"
        onSuccess={() => setPass(true)}
        placeholder="ALOHAMORA"
      />
    );
  }

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
