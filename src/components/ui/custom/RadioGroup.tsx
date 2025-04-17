
import React from "react";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helpText?: string;
  className?: string;
  inline?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  helpText,
  className,
  inline = false,
}: RadioGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <p className="block text-sm font-medium text-paycard-navy mb-2">{label}</p>
      )}
      <div className={cn("space-y-2", inline && "flex space-y-0 space-x-6")}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              className="h-4 w-4 text-paycard-navy border-paycard-navy-300 focus:ring-paycard-navy-500"
            />
            <span className="ml-2 text-sm text-paycard-navy">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-paycard-red">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}
