
import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium font-gilroy text-paycard-navy mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full font-poppins input-1 border border-paycard-navy-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-paycard-navy-300",
            error ? "border-paycard-red ring-1 ring-paycard-red" : "",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
