import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

type FormProps = {
  answer: string;
  onSuccess: () => void;
  error?: string;
  placeholder?: string;
  inputClassName?: string;
  btnClassName?: string;
  btnText?: string;
};

export const Form = ({
  answer,
  onSuccess,
  placeholder = "c===8",
  error = "",
  inputClassName,
  btnClassName,
  btnText = "VAZIUOJAM",
}: FormProps) => {
  const [value, setValue] = useState<string>("");
  const [err, setErr] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.toUpperCase() === answer.toUpperCase()) {
      onSuccess();
      return;
    }

    setErr(true);
  };
  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputClassName}
      />
      <Button size="lg" onClick={handleClick} className={btnClassName}>
        {btnText}
      </Button>
      {err && error && <p className="text-red-600">{error}</p>}
    </>
  );
};
