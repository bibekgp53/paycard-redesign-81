
import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn components
const RadioGroupBase = React.forwardRef<
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
RadioGroupBase.displayName = RadioGroupPrimitive.Root.displayName;

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

function RadioGroup({
  name,
  options = [], // Default to an empty array to prevent undefined.map() error
  value,
  onChange,
  label,
  error,
  helpText,
  className,
  inline = false,
}: RadioGroupProps) {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <p className="block text-sm font-medium font-poppins text-paycard-navy mb-2">{label}</p>
      )}
      <RadioGroupBase value={value} onValueChange={handleChange} className={cn("space-y-2", inline && "flex space-y-0 space-x-6")}>
        {options && options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupBase>
      {error && <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm font-poppins text-gray-500 body-small">{helpText}</p>}
    </div>
  );
}

// Export both versions
export { RadioGroupBase, RadioGroupItem, RadioGroup };
