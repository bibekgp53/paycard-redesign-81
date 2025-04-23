
import React from "react";
import { TimeInput } from "./time-input";
import type { CalendarProps } from "./calendar";

// Dedicated render function for time input, improving separation
export function CalendarTimeSection({
  showTimeInput,
  selected,
  onSelect,
  timeLabel,
}: Pick<CalendarProps, "showTimeInput" | "selected" | "onSelect" | "timeLabel">) {
  if (!showTimeInput || !selected) return null;
  return (
    <TimeInput
      value={selected}
      onChange={onSelect}
      label={timeLabel}
    />
  );
}
