
import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helpText, className, ...props }, ref) => {
    const errorPresent = Boolean(error);
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
            "w-full font-poppins input-1 border rounded px-3 py-2",
            errorPresent
              ? "border-paycard-red ring-1 ring-paycard-red"
              : "border-paycard-navy-200 focus:border-paycard-navy-400 focus:outline-none focus:ring-2 focus:ring-paycard-navy-300",
            // Remove any focus/focus-visible border styles if in error state
            errorPresent ? "" : "",
            className
          )}
          aria-invalid={errorPresent}
          {...props}
        />
        {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
