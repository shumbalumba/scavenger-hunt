import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    <div className="relative group w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "text-yellow-400 placeholder:text-yellow-900/60 selection:bg-yellow-500/30 selection:text-yellow-300",
          "bg-gray-900 border-2 border-yellow-500/70 w-full rounded-md px-3 py-2 text-base font-medium text-2xl",
          "shadow-[0_0_8px_rgba(234,179,8,0.3)] transition-all duration-300",
          "outline-none hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(234,179,8,0.4)]",
          "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(234,179,8,0.5)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-yellow-500/70 disabled:hover:shadow-[0_0_8px_rgba(234,179,8,0.3)]",
          "retro-input",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      
      {/* Input glow effect at bottom */}
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-yellow-400/50 transition-all duration-300 rounded-full blur-[2px] ${isFocused ? 'w-5/6 opacity-100' : 'w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-50'}`}></div>
    </div>
  )
}



export { Input }