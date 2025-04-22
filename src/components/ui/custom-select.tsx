
import React from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helpText?: string;
}

export const CustomSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, onChange, label, error, helpText, className, ...props }, ref) => {
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
        <select
          ref={ref}
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full font-poppins input-1 border border-paycard-navy-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-paycard-navy-300 bg-white",
            error ? "border-paycard-red ring-1 ring-paycard-red" : "",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";
