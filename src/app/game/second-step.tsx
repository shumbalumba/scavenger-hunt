"use client";

import { useState } from "react";
import { CoolText } from "../components/cool-text";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const texts = [
  // "Laurynai, džiaugiamės, kad pirmajį išbandymą jau įveikei. Jei nori įveikti 2-ąjį ir priartėti prie galutinio tikslo, tau teks išragauti šiuos gėrimus. Skanaus!",
  "1. JACK DANIEL'S ir COCA COLA 2.MIX VODKA & WATERMELON 3. Katlenburger Tropical Cocktail Pina Colada 4.Utenos Radler Arbūzinis 5. Pakartojam radleriuko 6.Kokteiliukas RIO Passionfruit Vodka ",
  "7.Pakartojam radleriuko 8. JACK DANIEL'S ir COCA COLA 9. Pakartojam radleriuko 10.Mionetto il spriz 11.196 strong zero Karčios citrinos skonio 12. Dasimušam su Kokteiliuku RIO Passionfruit Vodka",
];

export const SecondStep = ({ cb }: { cb: () => void }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const handleClick = () => {
    setErr("");
    if (value === "547223252893") {
      cb();
      return;
    }
    setErr("NOPE!");
  };

  return (
    <>
      <CoolText
        texts={texts}
        capitalize={true}
        color="blue"
        onComplete={() => setShowPlayer(true)}
      />
      {showPlayer && (
        <>
          <InputOTP
            maxLength={12}
            onChange={(value) => setValue(value)}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <span className="text-blue-400">.</span>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
              <span className="text-blue-400">.</span>
              <InputOTPSlot index={8} />
              <InputOTPSlot index={9} />
              <InputOTPSlot index={10} />
              <InputOTPSlot index={11} />
            </InputOTPGroup>
          </InputOTP>
          <Button variant="blue" onClick={handleClick}>
            SKAICIUOJAM
          </Button>
          {err && <p className="text-red-600">{err}</p>}
        </>
      )}
    </>
  );
};
