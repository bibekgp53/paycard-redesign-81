
import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-base input-1 font-poppins placeholder:text-paycard-navy-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-paycard-red ring-1 ring-paycard-red focus:outline-none focus-visible:outline-none outline-none"
            : "border-paycard-navy-200 focus:border-paycard-navy-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paycard-navy-300",
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

