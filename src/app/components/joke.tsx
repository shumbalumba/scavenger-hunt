"use client";

import { Button } from "@/components/ui/button";
import { CoolText } from "./cool-text";
import { useState } from "react";

const texts = ["LAURYNAS, LIAUDIES IŠMINTIS BYLOJA..."];

export const Joke = () => {
  const [showBtn, setShowBtn] = useState(false);
  const handleClick = () => {
    location.assign("https://www.youtube.com/watch?v=CYoRdfEBJyI");
  };

  return (
    <>
      <CoolText texts={texts} onComplete={() => setShowBtn(true)} />
      {showBtn && (
        <Button className="w-full" onClick={handleClick}>
          LIAUDIES IŠMINTIS
        </Button>
      )}
    </>
  );
};
