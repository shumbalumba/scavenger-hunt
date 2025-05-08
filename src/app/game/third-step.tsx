"use client";

import { CoolText } from "../components/cool-text";

const texts = ["54.7223 25.2893"];

export const ThirdStep = () => {
  return (
    <CoolText
      texts={texts}
      capitalize={true}
      color="blue"
      classNames="select-text"
    />
  );
};
