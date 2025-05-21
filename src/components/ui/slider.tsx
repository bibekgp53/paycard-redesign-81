
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
    showValue?: boolean;
    showTooltip?: boolean;
    showLabels?: boolean;
    min?: number;
    max?: number;
    step?: number;
  }
>(({
  className,
  label,
  showValue = false,
  showTooltip = false,
  showLabels = false,
  min = 0,
  max = 100,
  step = 1,
  value = [50],
  ...props
}, ref) => {
  // Handle rendering value display
  const displayValue = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value.length > 1 
        ? `${value[0]} - ${value[value.length - 1]}`
        : value[0];
    }
    return value;
  }, [value]);

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-medium font-poppins text-paycard-navy">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-poppins text-paycard-navy">
              {displayValue}
            </span>
          )}
        </div>
      )}

      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={Array.isArray(value) ? value : [value as number]}
        className="relative flex w-full touch-none select-none items-center"
        {...props}
      >
        {showLabels && (
          <div className="absolute -top-6 w-full flex justify-between text-xs text-paycard-navy-400">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}

        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-paycard-navy-150">
          <SliderPrimitive.Range className="absolute h-full bg-paycard-salmon" />
        </SliderPrimitive.Track>
        
        {Array.isArray(value) && value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-5 w-5 rounded-full border-2 border-white bg-paycard-salmon shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {showTooltip && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-paycard-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {Array.isArray(value) ? value[index] : value}
              </div>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </div>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
