
import React from "react";
import { TimeInput } from "./time-input";

interface CalendarTimeSectionProps {
  showTimeInput?: boolean;
  selected?: Date | null;
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
  return (
    <TimeInput
      value={selected}
      onChange={(value) => onSelect?.(value, { fromTimeInput: true })}
      label={timeLabel}
    />
  );
}
