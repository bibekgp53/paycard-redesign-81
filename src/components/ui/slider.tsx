
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
}: SliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {label && (
          <label className="text-sm font-medium font-gilroy text-paycard-navy">{label}</label>
        )}
        {showValue && (
          <span className="text-sm font-poppins text-paycard-navy">
            {Array.isArray(value) ? value[0] : value}
          </span>
        )}
      </div>
      
      <ShadcnSlider
        value={value}
        max={max}
        min={min}
        step={step}
        onValueChange={onValueChange}
        disabled={disabled}
        className="w-full"
      />
      
      {min !== undefined && max !== undefined && (
        <div className="flex justify-between">
          <span className="text-xs text-paycard-navy-400">{min}</span>
          <span className="text-xs text-paycard-navy-400">{max}</span>
        </div>
      )}
    </div>
  );
}

export default Slider;
