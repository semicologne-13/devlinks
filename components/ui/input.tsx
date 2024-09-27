import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    errorMessage?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, errorMessage, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center h-10 rounded-md border border-input bg-white px-3 text-sm ring-offset-selected-text focus-within:ring-1 focus-within:ring-selected-text focus-within:ring-offset-0",
          errorMessage ? "border-[#FF3939]" : "",
          className,
        )}
      >
        <div className="flex items-center flex-grow min-w-0">
          {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
          <input
            type={type}
            className="w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-w-0"
            ref={ref}
            {...props}
          />
        </div>
        {errorMessage && (
          <p className="text-[12px] text-[#FF3939] font-normal ml-2 flex-shrink-0 truncate">{errorMessage}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
