
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  showTooltip?: boolean;
  showLabels?: boolean;
  range?: boolean;
  rangeValues?: [number, number];
  onRangeChange?: (values: [number, number]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value,
  step = 1,
  onChange,
  className,
  showTooltip = false,
  showLabels = false,
  range = false,
  rangeValues = [25, 75],
  onRangeChange
}) => {
  const [internalValue, setInternalValue] = useState(value || min);
  const [internalRangeValues, setInternalRangeValues] = useState<[number, number]>(rangeValues);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined && !isDragging) {
      setInternalValue(value);
    }
  }, [value, isDragging]);

  useEffect(() => {
    if (!isDragging) {
      setInternalRangeValues(rangeValues);
    }
  }, [rangeValues, isDragging]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width);
    const newValue = Math.min(max, Math.max(min, min + (max - min) * position));
    const roundedValue = Math.round(newValue / step) * step;

    if (range) {
      // For range slider, find the closest thumb and update it
      const [minVal, maxVal] = internalRangeValues;
      const distToMin = Math.abs(roundedValue - minVal);
      const distToMax = Math.abs(roundedValue - maxVal);
      
      if (distToMin <= distToMax) {
        setInternalRangeValues([roundedValue, maxVal]);
        onRangeChange?.([roundedValue, maxVal]);
      } else {
        setInternalRangeValues([minVal, roundedValue]);
        onRangeChange?.([minVal, roundedValue]);
      }
    } else {
      setInternalValue(roundedValue);
      onChange?.(roundedValue);
    }
  };

  const getProgressStyle = () => {
    if (range) {
      const [minVal, maxVal] = internalRangeValues;
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      return { left: `${minPercent}%`, width: `${maxPercent - minPercent}%` };
    } else {
      const percent = ((internalValue - min) / (max - min)) * 100;
      return { width: `${percent}%` };
    }
  };

  const getThumbPosition = (isMax = false) => {
    if (range) {
      const [minVal, maxVal] = internalRangeValues;
      const value = isMax ? maxVal : minVal;
      return ((value - min) / (max - min)) * 100;
    } else {
      return ((internalValue - min) / (max - min)) * 100;
    }
  };

  return (
    <div className={cn("relative w-full py-4", className)}>
      {showLabels && (
        <div className="flex justify-between text-xs text-pcard-blue-700 mb-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
      
      <div 
        ref={trackRef}
        className="relative h-1 bg-pcard-blue-100 rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Progress bar */}
        <div 
          className="absolute h-1 bg-pcard-blue-400 rounded-full" 
          style={getProgressStyle()} 
        />
        
        {/* Thumbs */}
        {range ? (
          <>
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-2 bg-pcard-blue-600 rounded-full cursor-grab"
              style={{ left: `${getThumbPosition(false)}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-2 bg-pcard-blue-600 rounded-full cursor-grab"
              style={{ left: `${getThumbPosition(true)}%` }}
            />
          </>
        ) : (
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-2 bg-pcard-blue-600 rounded-full cursor-grab"
            style={{ left: `${getThumbPosition()}%` }}
          >
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-pcard-blue-600 text-white rounded text-xs whitespace-nowrap">
                {internalValue}
              </div>
            )}
          </div>
        )}
      </div>
      
      {range && showTooltip && (
        <div className="flex justify-between mt-4 text-xs text-pcard-blue-700">
          <span>{internalRangeValues[0]}</span>
          <span>{internalRangeValues[1]}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
