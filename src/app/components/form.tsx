import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

type FormProps = {
  answer: string;
  onSuccess: () => void;
  error?: string;
};

export const Form = ({ answer, onSuccess, error = "" }: FormProps) => {
  const [value, setValue] = useState<string>("");
  const [err, setErr] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value === answer) {
      onSuccess();
      return;
    }

    setErr(true);
  };
  return (
    <>
      <Input value={value} placeholder="c===8" onChange={handleChange} />
      <Button size="lg" onClick={handleClick}>
        VAZIOJAM
      </Button>
      {err && error && <p className="text-red-600">{error}</p>}
    </>
  );
};
