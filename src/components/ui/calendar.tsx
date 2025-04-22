
import * as React from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Only support single mode for Calendar!
export type CalendarProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode" | "selected" | "onSelect"
> & {
  showTimeInput?: boolean;
  timeLabel?: React.ReactNode;
  selected: Date | undefined;
  onSelect: (date: Date | undefined, opts?: { fromTimeInput?: boolean }) => void;
};

function getTimeString12(date?: Date) {
  // Returns { time: "HH:MM:SS", period: "AM" | "PM" }
  if (!date) return { time: "", period: "AM" };
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period: "AM" | "PM" = hours >= 12 ? "PM" : "AM";
  let adjHours = hours % 12;
  if (adjHours === 0) adjHours = 12;
  const time = [
    adjHours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return { time, period };
}

function parseTimeFromString(value: string, period: "AM" | "PM") {
  // value format: "HH:MM:SS" or "HH:MM"
  const [rawHours, rawMinutes, rawSeconds] = value.split(":");
  let h = parseInt(rawHours, 10) || 12;
  let m = parseInt(rawMinutes, 10) || 0;
  let s = typeof rawSeconds !== "undefined" ? parseInt(rawSeconds, 10) || 0 : 0;

  // Convert to 24-hour based on period
  let hours24 = h;
  if (period === "PM" && h !== 12) hours24 += 12;
  if (period === "AM" && h === 12) hours24 = 0;
  return { hours: hours24, minutes: m, seconds: s };
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showTimeInput = false,
  timeLabel = "Time",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  // Local state for input value and period
  const { time: inputTime, period } = getTimeString12(selected);

  // Handles changing the time (text input)
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selected) return;
    const val = e.target.value;
    const next = parseTimeFromString(val, period);
    const updated = new Date(selected.getTime());
    updated.setHours(next.hours, next.minutes, next.seconds, 0);
    onSelect(updated, { fromTimeInput: true });
  };

  // Handles toggling AM/PM (by clicking on span)
  const handleTogglePeriod = () => {
    if (!selected) return;
    let hours = selected.getHours();
    let newPeriod: "AM" | "PM" = period === "AM" ? "PM" : "AM";
    // Toggle hours for new period
    if (newPeriod === "PM" && hours < 12) {
      hours += 12;
    } else if (newPeriod === "AM" && hours >= 12) {
      hours -= 12;
    }
    const updated = new Date(selected.getTime());
    updated.setHours(hours);
    onSelect(updated, { fromTimeInput: true });
  };

  // Only close popover when selecting from calendar grid
  const handleDaySelect: SelectSingleEventHandler = (date) => {
    if (!date) return;
    // Use time from currently selected date if available
    if (selected) {
      date.setHours(selected.getHours(), selected.getMinutes(), selected.getSeconds(), 0);
    }
    onSelect(date, { fromTimeInput: false });
  };

  return (
    <div>
      <DayPicker
        mode="single"
        showOutsideDays={showOutsideDays}
        className={cn("p-3 pointer-events-auto", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        }}
        selected={selected}
        onSelect={handleDaySelect}
        {...props}
      />
      {showTimeInput && selected && (
        <div
          className="flex flex-row items-center gap-2 mt-3 mb-2 border border-paycard-navy-200 rounded-md px-2 py-2 bg-white w-full mx-auto"
          style={{ minWidth: 180, maxWidth: 300 }}
        >
          <label htmlFor="delay-time" className="text-xs font-medium text-paycard-navy mr-2 min-w-[42px] text-left">
            {timeLabel}
          </label>
          <input
            id="delay-time"
            type="text"
            pattern="^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?$"
            className="border border-paycard-navy-200 rounded px-2 py-1 bg-white w-[80px] text-left font-mono"
            value={inputTime}
            onChange={handleTimeInputChange}
            autoComplete="off"
          />
          <span
            className="text-xs font-semibold ml-1 select-none cursor-pointer border rounded px-2 py-1 bg-gray-50 hover:bg-gray-100"
            onClick={handleTogglePeriod}
            tabIndex={0}
            style={{ userSelect: "none" }}
            title="Toggle AM/PM"
          >
            {period}
          </span>
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

