"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";
import { Form } from "../components/form";

const texts = ["GAL ZEMELAPIS PARODYS KELIA?"];

export const SeventhStep = () => {
  const [hasAnswer, setHasAnswer] = useState(false);

  return (
    <>
      <CoolText texts={texts} capitalize={true} />
      <Form
        answer="FINISOTIESIOJI"
        onSuccess={() => setHasAnswer(true)}
        placeholder="MAMMA MIA"
      />
      {hasAnswer && <CoolText texts={["LEK KUR PARASYTA!"]} />}
    </>
  );
};
