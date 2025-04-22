
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  range?: boolean;
  rangeValues?: [number, number];
  onChange?: (value: number) => void;
  onRangeChange?: (values: [number, number]) => void;
  showTooltip?: boolean;
  showLabels?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  range = false,
  rangeValues = [25, 75],
  onChange,
  onRangeChange,
  showTooltip = false,
  showLabels = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [internalRangeValues, setInternalRangeValues] = useState(rangeValues);
  const [isDragging, setIsDragging] = useState(false);
  const [activeDot, setActiveDot] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update internal state when props change
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    setInternalRangeValues(rangeValues);
  }, [rangeValues]);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

  const handleRangeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue <= internalRangeValues[1]) {
      const newValues: [number, number] = [newValue, internalRangeValues[1]];
      setInternalRangeValues(newValues);
      onRangeChange && onRangeChange(newValues);
    }
  };

  const handleRangeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= internalRangeValues[0]) {
      const newValues: [number, number] = [internalRangeValues[0], newValue];
      setInternalRangeValues(newValues);
      onRangeChange && onRangeChange(newValues);
    }
  };

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const renderTooltip = (value: number) => {
    if (!showTooltip) return null;
    return (
      <div 
        className="absolute -top-8 transform -translate-x-1/2 bg-paycard-navy text-white py-1 px-2 rounded text-xs font-medium"
        style={{ left: `${getPercentage(value)}%` }}
      >
        {value}
      </div>
    );
  };

  if (range) {
    return (
      <div className={cn("relative py-4", className)}>
        <div className="relative h-1.5 bg-gray-200 rounded-full">
          <div 
            className="absolute h-full bg-paycard-navy rounded-full"
            style={{
              left: `${getPercentage(internalRangeValues[0])}%`,
              right: `${100 - getPercentage(internalRangeValues[1])}%`
            }}
          />
          {showTooltip && isDragging && activeDot === 'min' && renderTooltip(internalRangeValues[0])}
          {showTooltip && isDragging && activeDot === 'max' && renderTooltip(internalRangeValues[1])}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalRangeValues[0]}
          onChange={handleRangeMinChange}
          className="absolute w-full top-0 h-6 opacity-0 cursor-pointer z-10"
          onMouseDown={() => { setIsDragging(true); setActiveDot('min'); }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        />
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={internalRangeValues[1]}
          onChange={handleRangeMaxChange}
          className="absolute w-full top-0 h-6 opacity-0 cursor-pointer z-10"
          onMouseDown={() => { setIsDragging(true); setActiveDot('max'); }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        />

        <div 
          className="absolute w-4 h-4 bg-white border-2 border-paycard-navy rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer"
          style={{ left: `${getPercentage(internalRangeValues[0])}%`, top: '0.375rem' }}
        />
        
        <div 
          className="absolute w-4 h-4 bg-white border-2 border-paycard-navy rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer"
          style={{ left: `${getPercentage(internalRangeValues[1])}%`, top: '0.375rem' }}
        />
        
        {showLabels && (
          <div className="flex justify-between mt-2 text-xs text-gray-500 font-poppins">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative py-4", className)} ref={sliderRef}>
      <div className="relative h-1.5 bg-gray-200 rounded-full">
        <div 
          className="absolute h-full bg-paycard-navy rounded-full"
          style={{ width: `${getPercentage(internalValue)}%` }}
        />
        {showTooltip && isDragging && renderTooltip(internalValue)}
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onChange={handleSingleChange}
        className="absolute w-full top-0 h-6 opacity-0 cursor-pointer"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      />
      
      <div 
        className="absolute w-4 h-4 bg-white border-2 border-paycard-navy rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer"
        style={{ left: `${getPercentage(internalValue)}%`, top: '0.375rem' }}
      />
      
      {showLabels && (
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-poppins">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};
