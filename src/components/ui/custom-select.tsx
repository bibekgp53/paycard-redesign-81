
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helpText?: string;
  onChange?: (value: string) => void;
}

export const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helpText, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium font-gilroy text-paycard-navy mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "appearance-none w-full font-poppins input-1 border border-paycard-navy-200 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-paycard-navy-300",
              error ? "border-paycard-red ring-1 ring-paycard-red" : "",
              className
            )}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
