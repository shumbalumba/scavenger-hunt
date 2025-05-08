import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-2xl font-bold transition-all disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none tracking-wider overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-yellow-400 border-2 border-yellow-500 hover:bg-gray-800 hover:border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:shadow-[0_0_15px_rgba(234,179,8,0.7)] hover:text-yellow-300 retro-button",
        blue: "bg-gray-900 text-blue-400 border-2 border-blue-500 hover:bg-gray-800 hover:border-blue-400 shadow-[0_0_10px_rgba(96, 165, 250, 0.7)] hover:shadow-[0_0_15px_rgba(96, 165, 250, 0.7)] hover:text-blue-300 retro-button",
        destructive:
          "bg-gray-900 text-red-400 border-2 border-red-500 hover:bg-gray-800 hover:border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)] hover:shadow-[0_0_15px_rgba(248,113,113,0.7)] hover:text-red-300 retro-button-destructive",
        outline:
          "bg-gray-900/90 text-teal-400 border-2 border-teal-500 hover:bg-gray-800 hover:border-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] hover:shadow-[0_0_15px_rgba(45,212,191,0.7)] hover:text-teal-300 retro-button-outline",
        secondary:
          "bg-gray-900 text-purple-400 border-2 border-purple-500 hover:bg-gray-800 hover:border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)] hover:shadow-[0_0_15px_rgba(192,132,252,0.7)] hover:text-purple-300 retro-button-secondary",
        ghost:
          "bg-transparent hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:border-gray-600 border-2 border-transparent retro-button-ghost",
        link: "text-yellow-400 underline-offset-4 hover:underline hover:text-yellow-300 hover:shadow-[0_0_5px_rgba(234,179,8,0.5)] bg-transparent border-0",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-md text-base",
        sm: "h-8 rounded-md gap-1.5 px-3 text-lg",
        lg: "h-12 rounded-md px-6 text-2xl",
        xl: "h-16 rounded-md px-12 text-4xl",
        icon: "size-20 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
