
import React from "react";
import { TimeInput } from "./time-input";

interface CalendarTimeSectionProps {
  showTimeInput?: boolean;
  selected?: Date;
  onSelect?: (date: Date, opts?: { fromTimeInput?: boolean }) => void;
  timeLabel?: React.ReactNode;
}

// Dedicated render function for time input, improving separation
export function CalendarTimeSection({
  showTimeInput,
  selected,
  onSelect,
  timeLabel,
}: CalendarTimeSectionProps) {
  if (!showTimeInput || !selected) return null;
  
  const handleTimeChange = (value: Date) => {
    if (onSelect) {
      onSelect(value, { fromTimeInput: true });
    }
  };

  return (
    <TimeInput
      value={selected}
      onChange={handleTimeChange}
      label={timeLabel}
    />
  );
}
