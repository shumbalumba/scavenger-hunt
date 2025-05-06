"use client";

import { useLocalStorage } from "usehooks-ts";
import { FirstStep } from "./first-step";

const storageKey = "gameStep";

export default function Game() {
  const [currentStep] = useLocalStorage(storageKey, 0, {
    initializeWithValue: false,
  });

  const env = process.env.NODE_ENV;

  if (env === "production") {
    return null;
  }

  const renderGameStep = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep />;
      default:
        return null;
    }
  };

  return renderGameStep();
}
