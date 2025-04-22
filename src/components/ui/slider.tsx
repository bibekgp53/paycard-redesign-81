
import React from 'react';
import { Slider as ShadcnSlider } from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number[];
  onValueChange: (values: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  disabled?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  // For range slider functionality
  range?: boolean;
  rangeValues?: [number, number];
  onRangeChange?: (values: [number, number]) => void;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  className,
  disabled = false,
  showTooltip = false,
  showLabels = false,
  range = false,
  rangeValues,
  onRangeChange,
}: SliderProps) {
  // Handle rendering value display
  const displayValue = React.useMemo(() => {
    if (range && rangeValues) {
      return `${rangeValues[0]} - ${rangeValues[1]}`;
    }
    return Array.isArray(value) ? value[0] : value;
  }, [value, range, rangeValues]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {label && (
          <label className="text-sm font-medium font-gilroy text-paycard-navy">{label}</label>
        )}
        {showValue && (
          <span className="text-sm font-poppins text-paycard-navy">
            {displayValue}
          </span>
        )}
      </div>

      {/* If using range slider functionality */}
      {range && rangeValues && onRangeChange ? (
        <div className="relative w-full py-4">
          {showLabels && (
            <div className="flex justify-between text-xs text-pcard-blue-700 mb-2">
              <span className="text-paycard-navy-400">{min}</span>
              <span className="text-paycard-navy-400">{max}</span>
            </div>
          )}

          <ShadcnSlider
            value={rangeValues}
            max={max}
            min={min}
            step={step}
            onValueChange={(values) => {
              if (values.length >= 2) {
                onRangeChange([values[0], values[1]]);
              }
            }}
            disabled={disabled}
            className="w-full h-2"
            style={{}}
          >
            <div slot="track" className="h-2 w-full bg-paycard-navy-150 rounded-full" />
            <div slot="range" className="h-2 bg-paycard-salmon rounded-full" />
            <div slot="thumb" className="bg-paycard-salmon border-2 border-white w-5 h-5 rounded-full shadow" />
          </ShadcnSlider>

          {showTooltip && (
            <div className="flex justify-between mt-2 text-xs text-pcard-blue-700">
              <span>{rangeValues[0]}</span>
              <span>{rangeValues[1]}</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <ShadcnSlider
            value={value}
            max={max}
            min={min}
            step={step}
            onValueChange={onValueChange}
            disabled={disabled}
            className="w-full h-2"
            style={{}}
          >
            <div slot="track" className="h-2 w-full bg-paycard-navy-150 rounded-full" />
            <div slot="range" className="h-2 bg-paycard-salmon rounded-full" />
            <div slot="thumb" className="bg-paycard-salmon border-2 border-white w-5 h-5 rounded-full shadow" />
          </ShadcnSlider>

          {showTooltip && (
            <div className="absolute mt-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-pcard-blue-600 text-white rounded text-xs whitespace-nowrap">
              {Array.isArray(value) ? value[0] : value}
            </div>
          )}

          {min !== undefined && max !== undefined && showLabels && (
            <div className="flex justify-between">
              <span className="text-xs text-paycard-navy-400">{min}</span>
              <span className="text-xs text-paycard-navy-400">{max}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Slider;
