"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    setIsFocused(isActive || false);
  }, [isActive]);

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "text-blue-400 selection:bg-blue-500/30 selection:text-blue-300",
        "bg-gray-900 border-2 border-blue-500/70 relative flex h-9 w-9 items-center justify-center font-large text-4xl",
        "shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300",
        "outline-none hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]",
        "data-[active=true]:border-blue-400 data-[active=true]:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-blue-500/70 disabled:hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]",
        "retro-input",
        "border-y border-r text-2xl shadow-xs first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-blue-400 h-4 w-px duration-1000" />
        </div>
      )}

      {/* Input glow effect at bottom */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-blue-400/50 transition-all duration-300 rounded-full blur-[2px] ${isFocused ? "w-5/6 opacity-100" : "w-0 opacity-0 hover:w-2/3 hover:opacity-50"}`}
      ></div>
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="text-blue-500/70"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
