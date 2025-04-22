
import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn components
const ShadcnRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
});
ShadcnRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Custom RadioGroup component
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

function CustomRadioGroup({
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
        <p className="block text-sm font-medium font-gilroy text-paycard-navy mb-2">{label}</p>
      )}
      <div className={cn("space-y-2", inline && "flex space-y-0 space-x-6")}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer font-poppins body-text"
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
      {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
    </div>
  );
}

// Export both versions
export { 
  ShadcnRadioGroup as RadioGroupBase,
  RadioGroupItem,
  CustomRadioGroup as RadioGroup 
};
